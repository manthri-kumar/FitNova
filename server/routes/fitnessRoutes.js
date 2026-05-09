const express = require("express");
const router = express.Router();

const FitnessData = require("../models/FitnessData");

router.post("/save", async (req, res) => {

  try {

    const {
      userId,
      height,
      weight,
      bmi
    } = req.body;

    const data = await FitnessData.create({
      userId,
      height,
      weight,
      bmi
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:userId", async (req, res) => {

  try {

    const data = await FitnessData.findOne({
      userId: req.params.userId
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;