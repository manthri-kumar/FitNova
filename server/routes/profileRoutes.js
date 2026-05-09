const express = require("express");

const router = express.Router();

const Profile = require("../models/Profile");

/* SAVE PROFILE */

router.post("/save", async (req, res) => {

  try {

    const existing =
      await Profile.findOne({
        userId: req.body.userId
      });

    if(existing){

      const updated =
        await Profile.findOneAndUpdate(

          { userId: req.body.userId },

          req.body,

          { new: true }

        );

      return res.json(updated);
    }

    const profile =
      await Profile.create(req.body);

    res.json(profile);

  } catch(err){

    res.status(500).json({
      message: err.message
    });
  }
});

/* GET PROFILE */

router.get("/:id", async (req, res) => {

  try {

    const profile =
      await Profile.findOne({
        userId: req.params.id
      });

    res.json(profile);

  } catch(err){

    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;