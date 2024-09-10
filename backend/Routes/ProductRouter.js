const {
  getProducts,
  seedProducts,
} = require("../controllers/ProductController");
const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, getProducts);

router.get("/seed", seedProducts);

module.exports = router;
