const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
