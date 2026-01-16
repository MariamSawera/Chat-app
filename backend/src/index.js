import express from "express";
import authRoutes from "./routes/auth.route.js"

 const app = express();
 app.use(express.json());
 app.use("/api/auth", authRoutes)


 app.listen(5001, () => {
    console.log("Server is running on Port 5001");
 });