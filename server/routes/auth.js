import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";
const app = express();

// controllers
import { Register, Login,Logout, currentUser  } from "../controllers/auth";

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/Logout", Logout);
router.get("/current-user", requireSignin, currentUser);



module.exports = router;
