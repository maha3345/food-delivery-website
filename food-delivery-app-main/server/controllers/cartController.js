import User from "../models/userModel.js"

// Helper to get safe cartData object
const getSafeCart = (user) => {
  if (!user || !user.cartData) return {};
  if (typeof user.cartData === 'string') {
    try {
      return JSON.parse(user.cartData);
    } catch {
      return {};
    }
  }
  return { ...user.cartData };
};

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = getSafeCart(user);
    const itemId = String(req.body.itemId);
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await user.update({ cartData });
    res.json({ success: true, message: "Added to Cart" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = getSafeCart(user);
    const itemId = String(req.body.itemId);
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    await user.update({ cartData });
    res.json({ success: true, message: "Removed from Cart" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = getSafeCart(user);
    res.json({ success: true, cartData })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

export { addToCart, removeFromCart, getCart };
