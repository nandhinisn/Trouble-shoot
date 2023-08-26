import { expressjwt } from 'express-jwt'
import express from "express";

const router = express.Router();

export const requireSignin = expressjwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// Other middleware and routes


export default router; 