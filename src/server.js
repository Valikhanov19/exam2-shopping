import express from "express";
import * as env from "dotenv";
env.config();
import adminRouter from "./routes/admin.router.js";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";

const PORT = process.env.PORT || 5600;
const app = express();
app.use(express.json());

// routes
app.use("/api", adminRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

app.listen(PORT, () => {
  console.log("listening in port " + PORT);
});
