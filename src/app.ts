import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import connectDb from "./config/db.js";
import cookieParser from 'cookie-parser';
connectDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API Working with /api/v2");
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log({ port });
  console.log(`Server is working  http://localhost:${port}`);
});
