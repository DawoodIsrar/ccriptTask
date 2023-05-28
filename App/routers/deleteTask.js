const express = require('express')
const router = express.Router()
const db = require('../models')
const task = db.task

router.delete("/deleteTask/:t_id",async (req,res)=>{
try {

  if(req.params.t_id == null){
    return res.status(200).json({message:"Sorry the task id is not provided in the params"})
  }else{

    const taskExist = await task.findOne({
      where: {
        id: req.params.t_id,
      },
    });
    if(taskExist!= null){
      await task.destroy({
        where:{
          id:req.params.t_id
        }
      })
      return res.status(200).json({message:"The task detail is deleted succesffully"})
    }
   
  }     
} catch (error) {
    return res.status(500).send("sorry something went wrong server errorr")
}
})
module.exports = router
