const ensureAuthenticated = require("../Middlewares/Auth");
const Product = require("../models/Product");
const router = require("express").Router();

const getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const products = await Product.find()
      .limit(limit * 1) // convert limit to integer
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments();

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const seedProducts = async (req, res) => {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      title: `Product ${i}`,
      body: `This is the body of post ${i}`,
    });
  }

  try {
    await Product.insertMany(products);
    res.status(201).json({ message: "Database seeded!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  seedProducts,
};
