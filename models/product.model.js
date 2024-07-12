const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./category.model");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sale_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cost_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Barcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

module.exports = Product;
