import express from "express";
import prisma from "./lib/prisma.js";
const app = express();
const PORT = process.env.PORT || 4000;
import transactionsRoute from "./routes/transaction.routes.js";
import rateLimiter from "./middleware/ratelimiter.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import { connectRedis } from "./lib/redis.js";
import job from "./config/cron.js";


app.use(rateLimiter)
app.use(express.json());
if (process.env.NODE_ENV === "production") job.start();

await connectRedis()

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions",transactionsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
