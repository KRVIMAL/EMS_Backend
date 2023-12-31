import express from "express";
import userRoute from "./routes/user.js"
import { connectDb } from "./utils/features.js";
const app = express();

const port=4000;
connectDb();
app.use(express.json());
app.get("/",(req,res)=>{
  res.send("API Working with /api/v2");
})

app.use("/api/v1/user",userRoute)

app.listen(port, () => {
  console.log({port});
  console.log(`Server is working  http://localhost:${port}`);
});
