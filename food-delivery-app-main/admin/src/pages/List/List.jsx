import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foofId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foofId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            const itemId = item.id || item._id || index;
            return (
              <div key={itemId} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt={item.name} />
                <p style={{ fontWeight: "600" }}>{item.name}</p>
                <p>{item.category}</p>
                <p style={{ fontWeight: "600", color: "#1b1e28" }}>₹{item.price}</p>
                <p
                  onClick={() => removeFood(item.id || item._id)}
                  className="cursor"
                  style={{
                    color: "#ff4a22",
                    fontWeight: "bold",
                    fontSize: "16px",
                    display: "inline-block",
                    padding: "4px 8px"
                  }}
                  title="Delete dish">
                  ✕
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default List;
