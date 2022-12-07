const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const cartRoute = require("./routes/cart.js");
const ordersRoute = require("./routes/order.js");
const cors = require("cors");
const stripeRoute = require("./routes/stripe.js");



dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/cart", cartRoute);
  app.use("/api/order", ordersRoute);
  app.use("/api/checkout", stripeRoute);
  
  

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});