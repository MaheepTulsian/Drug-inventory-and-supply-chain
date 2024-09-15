import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import manufacturerRoute from "./Routes/manufacture.js";
import wholesalerRoute from "./Routes/wholeseller.js";
const app = express();
dotenv.config();
const Port = process.env.PORT || 8000;

//cors middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//regular express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

//router from manufacutur
app.use("/api/manufacturer", manufacturerRoute);
app.use("/api/wholeseller", wholesalerRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
