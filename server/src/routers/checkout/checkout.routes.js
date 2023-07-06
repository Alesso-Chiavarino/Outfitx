import { Router } from "express";
import { checkout } from "../controllers/checkout.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello MP!");
});

router.post("/", checkout);

export default router;