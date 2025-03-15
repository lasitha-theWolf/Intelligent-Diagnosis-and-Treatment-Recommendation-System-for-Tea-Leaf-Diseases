import express from "express";
import { analyzeLeafImage, analyzeTeaLeafImage, analyzeCNNLeafImage } from "../controller/segmentationController.js";

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("Segmentation route handler called");
  next();
}, analyzeLeafImage);

router.post("/leaf-recognition", (req, res, next) => {
  console.log("Segmentation route handler called");
  next();
}, analyzeTeaLeafImage);

router.post("/cnn-detection", (req, res, next) => {
  console.log("Segmentation route handler called");
  next();
}, analyzeCNNLeafImage);

console.log("Segmentation router loaded");

export default router;