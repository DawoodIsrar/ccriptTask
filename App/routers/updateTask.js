const express = require("express");
const router = express.Router();
const db = require("../models");
const task = db.task;

router.patch("/updateTask", async (req, res) => {
  try {
    if (req.body.taskDetail == null  && req.body.id == null ) {
      return res
        .status(200)
        .json({ message: "Sorry task detail is required" });
    } else {
      const taskExist = await task.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (taskExist != null) {
        await task.update(
          {
            taskDetail: req.body.taskDetail,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
        return res
        .status(200)
        .json({ message: "The task detail is updated succesffully" });
      }else{
        return res
        .status(200)
        .json({ message: "No task exist on body id" });
      
      }
     
    }
  } catch (error) {
    return res.status(500).send("sorry something went wrong server error");
  }
});
module.exports = router;
