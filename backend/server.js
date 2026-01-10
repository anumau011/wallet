import express from "express";
import prisma from "./lib/prisma.js";
const app = express();
const PORT = 4000;
import transactionsRoute from "./routes/transaction.routes.js";
import rateLimiter from "./middleware/ratelimiter.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import { connectRedis } from "./lib/redis.js";

app.use(rateLimiter)
app.use(express.json());
await connectRedis()

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions",transactionsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
