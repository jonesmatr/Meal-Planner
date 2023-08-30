const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MealPlan extends Model {}

MealPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    meal_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    day_of_week: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal_plan',
  }
);

module.exports = MealPlan;