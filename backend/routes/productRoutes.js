import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  deleteProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductsById)
  .delete(protect, admin, deleteProduct);

export default router;
