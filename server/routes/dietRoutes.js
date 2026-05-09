// server/routes/dietRoutes.js

const express = require("express");

const router = express.Router();

router.post(
"/generate",

async(req,res)=>{

  try{

    const {
      bmi,
      goal
    } = req.body;

    let diet = {};

    /* WEIGHT LOSS */

    if(goal === "Weight Loss"){

      diet = {

        calories:1800,

        protein:"140g",

        carbs:"150g",

        fats:"50g",

        water:"4L",

        mealPlan:[

          "Oats + Banana + Almonds",

          "Boiled Eggs + Brown Bread",

          "Grilled Chicken + Rice",

          "Salad + Green Tea",

          "Soup + Vegetables"
        ]
      };
    }

    /* MUSCLE GAIN */

    else if(
      goal === "Muscle Gain"
    ){

      diet = {

        calories:2800,

        protein:"180g",

        carbs:"320g",

        fats:"70g",

        water:"5L",

        mealPlan:[

          "Peanut Butter Toast + Milk",

          "Egg Omelette + Oats",

          "Chicken Breast + Rice",

          "Protein Shake + Banana",

          "Paneer + Sweet Potato"
        ]
      };
    }

    /* MAINTAIN FITNESS */

    else{

      diet = {

        calories:2300,

        protein:"120g",

        carbs:"220g",

        fats:"60g",

        water:"3.5L",

        mealPlan:[

          "Fruits + Oats",

          "Rice + Dal + Vegetables",

          "Nuts + Yogurt",

          "Grilled Fish + Salad",

          "Milk + Dry Fruits"
        ]
      };
    }

    /* BMI MODIFICATION */

    if(bmi > 30){

      diet.healthRisk =
      "High Obesity Risk";

      diet.tip =
      "Focus on calorie deficit and cardio.";
    }

    else if(bmi > 25){

      diet.healthRisk =
      "Moderate Risk";

      diet.tip =
      "Maintain regular exercise and balanced diet.";
    }

    else{

      diet.healthRisk =
      "Healthy";

      diet.tip =
      "Maintain your healthy lifestyle.";
    }

    res.json(diet);

  }catch(err){

    console.log(err);

    res.status(500).json({

      message:"Server Error"
    });
  }
});

module.exports = router;