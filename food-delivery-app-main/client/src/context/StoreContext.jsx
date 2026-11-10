import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";
import { food_list as defaultFoodList } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoofList] = useState(defaultFoodList);
  const [searchQuery, setSearchQuery] = useState("");
  const buttonRef = useRef(null);

  const getImageUrl = (imageName) => {
    if (!imageName) return "";
    if (imageName.startsWith("http://") || imageName.startsWith("https://")) return imageName;
    if (typeof window !== "undefined" && window.location.protocol === "https:" && (!url || url.includes("localhost"))) {
      return `/images/${imageName}`;
    }
    return `${url}/images/${imageName}`;
  };

  const addToCart = async (itemId) => {
    const key = String(itemId);
    setCartItems((prev) => {
      const current = prev[key] || 0;
      return { ...prev, [key]: current + 1 };
    });
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId: key },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Failed to add to cart API:", err);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    const key = String(itemId);
    setCartItems((prev) => {
      const current = prev[key] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return { ...prev, [key]: current - 1 };
    });
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId: key },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Failed to remove from cart API:", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find(
          (product) =>
            String(product._id) === String(item) ||
            String(product.id) === String(item)
        );
        if (itemInfo) {
          totalAmount += Number(itemInfo.price) * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        count += cartItems[item];
      }
    }
    return count;
  };

  const fetchFoofList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      const foods = response.data?.data;
      if (Array.isArray(foods) && foods.length > 0) {
        setFoofList(foods);
      }
    } catch (error) {
      console.log("Using built-in food menu items.");
    }
  };

  const loadCartData = async (activeToken) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token: activeToken } }
      );
      if (response.data?.success && response.data?.cartData) {
        setCartItems(response.data.cartData);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const cached = localStorage.getItem("user_profile");
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  const fetchUserProfile = async (activeToken) => {
    const t = activeToken || token;
    if (!t) return;
    try {
      const res = await axios.get(`${url}/api/user/profile`, {
        headers: { token: t },
      });
      if (res.data.success && res.data.user) {
        setUserProfile(res.data.user);
        localStorage.setItem("user_profile", JSON.stringify(res.data.user));
        return;
      }
    } catch (err) {
      console.log("Using cached/local user profile.");
    }
    try {
      const cached = localStorage.getItem("user_profile");
      if (cached) setUserProfile(JSON.parse(cached));
    } catch (e) {}
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoofList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData(token);
      fetchUserProfile(token);
    } else {
      setUserProfile(null);
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartCount,
    url,
    token,
    setToken,
    buttonRef,
    fetchFoofList,
    searchQuery,
    setSearchQuery,
    userProfile,
    setUserProfile,
    fetchUserProfile,
    getImageUrl,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
