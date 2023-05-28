const express = require("express");
const db = require("../models");
const task = db.task;
const router = express.Router();
const addTask = router.post("/addTasks", async (req, res) => {
  try {
    if (req.body.taskDetail === null) {
      return res
        .status(200)
        .json({ message: "please fill the task detail field." });
    } else {
      const taskExist = await task.findOne({
        where: {
          taskDetail: req.body.taskDetail,
        },
      });
      if (taskExist == null) {
        await task.create({
          taskDetail: req.body.taskDetail,
        });
        return res.status(201).json({ message: "Task is added successfully" });
      } else {
        return res
          .status(200)
          .json({ message: "sorry Task is already existed" });
      }
    }
  } catch {
    return res
      .status(500)
      .json({ message: "sorry something went wrong server error" });
  }
});

module.exports = addTask;
