// In your routes/api folder or somewhere similar
const router = require('express').Router();
const withAuth = require('../../utils/auth');

// Assuming MealPlan is your Sequelize model for meal plans
const { MealPlan } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  try {
    const newMealPlan = await MealPlan.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMealPlan);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Additional routes for meal plans can go here

module.exports = router;
