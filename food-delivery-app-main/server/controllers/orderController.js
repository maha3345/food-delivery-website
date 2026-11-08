import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const deliveryPartners = [
  { name: "Ramesh Kumar", phone: "+91 98765 43210", vehicle: "Honda Activa (TS09 AB 1234)", status: "Assigned & heading to restaurant" },
  { name: "Suresh Reddy", phone: "+91 98765 43211", vehicle: "TVS Jupiter (TS07 CD 5678)", status: "Assigned & heading to restaurant" },
  { name: "Vikram Singh", phone: "+91 98765 43212", vehicle: "Hero Splendor (TS10 EF 9012)", status: "Assigned & heading to restaurant" },
  { name: "Rahul Verma", phone: "+91 98765 43213", vehicle: "Bajaj Pulsar (TS08 GH 3456)", status: "Assigned & heading to restaurant" },
  { name: "Anil Sharma", phone: "+91 98765 43214", vehicle: "Honda Shine (TS09 JK 7890)", status: "Assigned & heading to restaurant" }
];

// placing user order with Cash on Delivery (COD)
const placeOrder = async (req, res) => {
  try {
    const assignedPartner = deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];

    const newOrder = await Order.create({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: "Food Processing",
      payment: false, // Cash on Delivery (paid upon receipt)
      deliveryPartner: assignedPartner,
    });

    // Clear cart in database
    await User.update({ cartData: {} }, { where: { id: req.body.userId } });

    res.json({
      success: true,
      message: `Order placed successfully! Our delivery partner ${assignedPartner.name} has been assigned and is heading to the restaurant to collect your food.`,
      orderId: newOrder.id,
      deliveryPartner: assignedPartner,
    });
  } catch (error) {
    console.log("Order placement error:", error);
    res.json({ success: false, message: error.message || "Error placing order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true" || success === true) {
      await Order.update({ payment: true }, { where: { id: orderId } });
      res.json({ success: true, message: "Order Confirmed" });
    } else {
      res.json({ success: true, message: "Order Processed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || "Error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.body.userId },
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// listing order for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await Order.update({ status: req.body.status }, { where: { id: req.body.orderId } });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
