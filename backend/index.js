import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import manufacturerRoute from "./Routes/manufacture.js";
const app = express();
dotenv.config();
const Port = process.env.PORT || 8000;

//regular express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

//router from manufacutur
app.use('/api/manufacturer', manufacturerRoute);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
