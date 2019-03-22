import express from "express";
import { saveGuests } from "../services/guests";
const router = express.Router();

router.route("/test").get((req, res, next) => {
  res.status(200).json({
    success: true,
    data: "updated test"
  });
});

router.route("/save-guest").post(async (req, res, next) => {
  try {
    console.log("server index: ", req.body);
    const saveRequest = JSON.parse(JSON.stringify(req.body));
    const data = await saveGuests(saveRequest);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
});

export default router;
