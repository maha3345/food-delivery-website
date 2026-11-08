import React, { useEffect } from "react";
import "./OrderDetailModal.css";
import { assets } from "../../assets/assets";

const OrderDetailModal = ({ order, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  const items = Array.isArray(order.items) ? order.items : [];
  const addr = order.address || {};
  const partner = order.deliveryPartner || null;

  const statusColor =
    order.status === "Delivered"
      ? "#10b981"
      : order.status === "Out for Delivery"
      ? "#f59e0b"
      : "#ff4a22";

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Just now";

  return (
    <div className="order-detail-overlay" onClick={onClose}>
      <div
        className="order-detail-card"
        onClick={(e) => e.stopPropagation()}>
        <div className="order-detail-header">
          <div className="order-detail-header-info">
            <span className="order-detail-badge-id">Order #{order.id || order._id}</span>
            <span className="order-detail-date">{formattedDate}</span>
          </div>
          <button className="order-detail-close-btn" onClick={onClose} title="Close (Esc)">
            ✕
          </button>
        </div>

        {/* Live Status Header */}
        <div className="order-status-banner">
          <div className="status-indicator" style={{ backgroundColor: statusColor }}></div>
          <div>
            <h4 style={{ color: statusColor, margin: 0, fontSize: "16px", fontWeight: "700" }}>
              {order.status}
            </h4>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#6b7280" }}>
              {order.status === "Delivered"
                ? "Your meal has been delivered. Enjoy your food!"
                : order.status === "Out for Delivery"
                ? "Delivery partner is on the way to your doorstep."
                : "Kitchen is preparing your food freshly with love."}
            </p>
          </div>
        </div>

        <div className="order-detail-body">
          {/* Delivery Partner Section */}
          <div className="order-section-card">
            <div className="section-title">
              <span>🛵</span> Assigned Delivery Partner
            </div>
            {partner ? (
              <div className="partner-details">
                <div className="partner-avatar">👨‍🍳</div>
                <div className="partner-info">
                  <h5>{partner.name}</h5>
                  <p>{partner.vehicle || "Delivery Two-Wheeler"}</p>
                  <p className="partner-phone">📞 {partner.phone}</p>
                </div>
                <div className="partner-status-tag">
                  {partner.status || "En route to restaurant"}
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                Delivery partner is being assigned by the kitchen dispatch team.
              </p>
            )}
          </div>

          {/* Delivery Address Section */}
          <div className="order-section-card">
            <div className="section-title">
              <span>📍</span> Delivery Address
            </div>
            <div className="address-details">
              <p className="address-name">
                {addr.firstName || addr.lastName
                  ? `${addr.firstName || ""} ${addr.lastName || ""}`.trim()
                  : "Customer"}
              </p>
              <p>{addr.street}</p>
              <p>
                {[addr.city, addr.state, addr.pincode || addr.zipcode].filter(Boolean).join(", ")}
              </p>
              {addr.phone && <p className="address-phone">📞 {addr.phone}</p>}
            </div>
          </div>

          {/* Itemized Food List */}
          <div className="order-section-card">
            <div className="section-title">
              <span>🍽</span> Ordered Items ({items.length})
            </div>
            <div className="order-items-list">
              {items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <div className="order-item-name">
                    <span className="order-item-qty">{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="order-item-price">
                    ₹{(item.price || 0) * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <hr className="order-divider" />

            {/* Bill Summary */}
            <div className="order-bill-summary">
              <div className="bill-row">
                <span>Items Subtotal</span>
                <span>₹{order.amount - 99 > 0 ? order.amount - 99 : order.amount}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Fee</span>
                <span>₹99</span>
              </div>
              <div className="bill-row total">
                <b>Total Amount</b>
                <b>₹{order.amount}.00</b>
              </div>
              <div className="bill-payment-mode">
                💵 Payment Mode: <b>Cash on Delivery (COD)</b>
              </div>
            </div>
          </div>
        </div>

        <div className="order-detail-footer">
          <button className="order-close-footer-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
