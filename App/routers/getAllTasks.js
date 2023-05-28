const express = require("express");
const router = express.Router();
const db = require("../models");
const { QueryTypes } = require('sequelize');

const Task = db.task; // Assuming you have a model named 'task' in your models file

router.get("/getTotalTasks", async (req, res) => {
  try {
    const data = await db.sequelize.query(" use ccTask; SELECT * FROM tasks", {
      type: QueryTypes.SELECT,
    });

    if (data != null) {
      return res
        .status(200)
        .json({ data, message: "All tasks are loaded successfully" });
    } else {
      return res
        .status(500)
        .send("Sorry, something went wrong. Server error");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Sorry, something went wrong. Server error");
  }
});

module.exports = router;
