import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import OrderDetailModal from "../../components/OrderDetailModal/OrderDetailModal";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        setData(response.data.data);
        return;
      }
    } catch (err) {
      console.warn("Backend orders unreachable, loading local orders fallback.");
    } finally {
      try {
        const local = JSON.parse(localStorage.getItem("local_orders") || "[]");
        if (local.length > 0) {
          setData((prev) => (prev && prev.length > 0 ? prev : local));
        }
      } catch (e) {}
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <>
      <div className="my-orders">
        <h2>My Orders</h2>
        {!token ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p>Please sign in to view your orders.</p>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p>Loading your orders...</p>
          </div>
        ) : data.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#666" }}>
            <img src={assets.parcel_icon} alt="No orders" style={{ width: "60px", opacity: 0.5 }} />
            <h3 style={{ marginTop: "15px", color: "#1b1e28" }}>No orders placed yet!</h3>
            <p style={{ marginTop: "5px", color: "#5e6573" }}>Your order history will appear here once you place an order.</p>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                padding: "12px 28px",
                backgroundColor: "#ff4a22",
                color: "white",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow: "0 4px 14px rgba(255, 74, 34, 0.25)"
              }}>
              Order Food Now
            </button>
          </div>
        ) : (
          <div className="container">
            {data.map((order, index) => {
              const itemsList = Array.isArray(order.items) ? order.items : [];
              const statusColor =
                order.status === "Delivered"
                  ? "#10b981"
                  : order.status === "Out for Delivery"
                  ? "#f59e0b"
                  : "#ff4a22";
              return (
                <div
                  key={order.id || order._id || index}
                  className="my-orders-order"
                  onClick={() => setSelectedOrder(order)}
                  style={{ cursor: "pointer" }}
                  title="Click to view full order details">
                  <img src={assets.parcel_icon} alt="Order" />
                  <div>
                    <p style={{ fontWeight: "600", color: "#1b1e28" }}>
                      {itemsList.map((item, idx) => {
                        return `${item.name} x ${item.quantity}${idx === itemsList.length - 1 ? "" : ", "}`;
                      })}
                    </p>
                    {order.deliveryPartner && (
                      <p style={{ fontSize: "12px", color: "#ff4a22", marginTop: "4px", fontWeight: "600" }}>
                        🛵 Delivery Partner: {order.deliveryPartner.name} ({order.deliveryPartner.phone})
                      </p>
                    )}
                  </div>
                  <p>
                    <b>₹{order.amount}.00</b>
                    <span style={{ display: "block", fontSize: "11px", color: "#888", fontWeight: "normal" }}>
                      Cash on Delivery
                    </span>
                  </p>
                  <p>Items: {itemsList.length}</p>
                  <div>
                    <p>
                      <span style={{ color: statusColor, fontSize: "16px", marginRight: "4px" }}>&#x25cf;</span>
                      <b style={{ color: statusColor }}>{order.status}</b>
                    </p>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>
                      {order.status === "Delivered"
                        ? "Delivered safely"
                        : order.status === "Out for Delivery"
                        ? "Partner on the way"
                        : "Partner dispatched to kitchen"}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }} onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        backgroundColor: "#ff4a22",
                        color: "white",
                        padding: "8px 12px",
                        fontSize: "12px"
                      }}>
                      View Details
                    </button>
                    <button
                      onClick={fetchOrders}
                      style={{
                        backgroundColor: "#fff3f0",
                        color: "#ff4a22",
                        padding: "6px 12px",
                        fontSize: "11px"
                      }}>
                      Refresh
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <OrderDetailModal
        isOpen={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default MyOrders;
