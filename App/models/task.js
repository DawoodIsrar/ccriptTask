const express = require("express");
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
module.exports = (sequelize, Sequelize, DataTypes) => {
  const task = sequelize.define("task", {
  
    taskDetail: {
      type: DataTypes.STRING,
      allowNull: false
    },
 
  },
    {
      createdAt: false,
      updatedAt: false
    }
  );

  return task;
};
