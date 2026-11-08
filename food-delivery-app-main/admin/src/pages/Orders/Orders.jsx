import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <div className="order add">
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order, index) => {
            const itemsList = Array.isArray(order.items) ? order.items : [];
            const orderId = order.id || order._id || index;
            return (
              <div key={orderId} className="order-item">
                <img src={assets.parcel_icon} alt="Parcel" />
                <div>
                  <p className="order-item-food">
                    {itemsList.map((item, idx) => {
                      if (idx === itemsList.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className="order-item-name">
                    {order.address?.firstName + " " + order.address?.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address?.street + ","}</p>
                    <p>
                      {(order.address?.city || "") +
                        ", " +
                        (order.address?.state || "") +
                        ", " +
                        (order.address?.country || "") +
                        ", " +
                        (order.address?.pincode || "")}
                    </p>
                  </div>
                  <p className="order-item-phone">📞 {order.address?.phone}</p>
                  {order.deliveryPartner && (
                    <p style={{ fontSize: "12px", color: "#ff4a22", marginTop: "4px", fontWeight: "600" }}>
                      🛵 Partner: {order.deliveryPartner.name} ({order.deliveryPartner.phone})
                    </p>
                  )}
                </div>
                <p>Items: {itemsList.length}</p>
                <div>
                  <p style={{ fontWeight: "700", color: "#1b1e28", fontSize: "16px" }}>₹{order.amount}</p>
                  <span style={{
                    display: "inline-block",
                    marginTop: "6px",
                    padding: "3px 8px",
                    backgroundColor: "#e8f5e9",
                    color: "#2e7d32",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    Cash on Delivery
                  </span>
                </div>
                <select
                  onChange={(event) => statusHandler(event, order.id || order._id)}
                  value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
