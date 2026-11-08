import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Food Processing",
  },
  payment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deliveryPartner: {
    type: DataTypes.JSONB,
    defaultValue: null,
  },
}, {
  timestamps: true,
});

// Add _id virtual so frontend (built for MongoDB) keeps working
Order.prototype.toJSON = function () {
  const values = { ...this.get() };
  values._id = values.id;
  return values;
};

export default Order;
