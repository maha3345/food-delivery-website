import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery, setSearchQuery } = useContext(StoreContext);

  const filteredFoods = (food_list || []).filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const query = (searchQuery || "").trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesName = item.name && item.name.toLowerCase().includes(query);
    const matchesDesc = item.description && item.description.toLowerCase().includes(query);
    const matchesCat = item.category && item.category.toLowerCase().includes(query);

    return matchesCategory && (matchesName || matchesDesc || matchesCat);
  });

  return (
    <>
      <div className="food-display" id="food-display">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <h2>
            {searchQuery ? `Search Results for "${searchQuery}"` : "Top dishes near you"}
          </h2>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "20px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px"
              }}>
              ✕ Clear Search
            </button>
          )}
        </div>

        {filteredFoods.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 0", color: "#666" }}>
            <h3>No dishes found matching "{searchQuery}"</h3>
            <p style={{ marginTop: "10px" }}>Try searching for a different item or category (e.g. Salad, Cake, Paneer, Pasta).</p>
            <button
              onClick={() => setSearchQuery("")}
              style={{
                marginTop: "16px",
                backgroundColor: "#ff4a22",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "10px 24px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(255, 74, 34, 0.25)"
              }}>
              View All Dishes
            </button>
          </div>
        ) : (
          <div className="food-display-list">
            {filteredFoods.map((item, index) => {
              return (
                <FoodItem
                  key={item._id || item.id || index}
                  id={item._id || item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  category={item.category}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default FoodDisplay;
