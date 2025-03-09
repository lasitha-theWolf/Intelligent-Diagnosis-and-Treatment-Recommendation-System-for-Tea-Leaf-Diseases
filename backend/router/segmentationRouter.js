import express from "express";
import { analyzeLeafImage } from "../controller/segmentationController.js";

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("Segmentation route handler called");
  next();
}, analyzeLeafImage);

console.log("Segmentation router loaded");

export default router;