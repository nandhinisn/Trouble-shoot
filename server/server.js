import express from "express";
import cors from 'cors';
import csrf from "csurf";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { readdirSync } from 'fs';
import mongoose from "mongoose";
const morgan = require('morgan')
require("dotenv").config();


const csrfProtection = csrf({ cookie: true });
// Create express app
const app = express();

// DB connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));


// Apply middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


const myMiddleware = (req, res, next) => {
  console.log("This is my own middleware");
  // You can add some custom processing here if needed
  next();
};

app.use(myMiddleware); // Using the custom middleware

// Route
readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`)));

// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
