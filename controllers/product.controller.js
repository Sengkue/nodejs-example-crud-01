const Product = require("../models/product.model");
const Category = require("../models/category.model");
const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');
exports.create = (req, res) => {
  Product.create({ ...req.body })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(200).json({ result: error });
    });
};
exports.findAll = (req, res) => {
  sequelize
    .query(
      `SELECT pr.profile, pr.id, pr.name, ca.category,pr.size, pr.color, pr.description, pr.quantity, pr.sale_price, pr.cost_price, pr.Barcode, pr.createdAt, pr.updatedAt,
      ca.id AS category_id
      FROM products pr
      INNER JOIN categories ca ON pr.category_id = ca.id`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  sequelize
    .query(
      `SELECT pr.profile, pr.id, pr.name, ca.category,pr.size_id, pr.color, pr.description, pr.quantity, pr.sale_price, pr.cost_price, pr.Barcode, pr.createdAt, pr.updatedAt, sup.name AS supplier_name,
      ca.id AS category_id, sup.id AS supplier_id
      FROM products pr
      INNER JOIN categories ca ON pr.category_id = ca.id
      INNER JOIN Suppliers sup ON pr.supplier_id = sup.id
      WHERE pr.id = :id`,
      {
        replacements: { id: id },
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ result: 'Product not found1' });
      }
      const product = data[0];
      return res.status(200).json({ result: product });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  const updatedProduct = { ...req.body };

  Product.update(updatedProduct, { where: { id: id } })
    .then((result) => {
      if (result[0] === 1) {
        // Product updated successfully
        return res.status(200).json({ result: "Product updated successfully" });
      } else {
        // Product not found
        return res.status(404).json({ result: "Product not found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Product.destroy({ where: { id: id } })
    .then((data) => {
      return res.status(200).json({ result: data });
    })
    .catch((error) => {
      return res.status(500).json({ result: error });
    });
};
exports.deleteAll = async (req, res) => {
  try {
    const deletedCount = await Product.destroy({ where: {} });
    return res.status(200).json({ result: `Deleted ${deletedCount} products successfully` });
  } catch (error) {
    return res.status(500).json({ result: error });
  }
};
