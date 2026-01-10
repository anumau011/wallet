import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "../controllers/transaction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", getTransactionsByUserId);
router.get("/summary", getSummaryByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;