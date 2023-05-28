const express = require("express");
const bodyParser = require("body-parser");
const addTask = require('./App/routers/addTask')
const deleteTask = require('./App/routers/deleteTask')
const updateTask = require('./App/routers/updateTask')
const getAllTasks = require('./App/routers/getAllTasks')

// const bcrypt = require("bcrypt");
const cors = require("cors");
// const jsonwebtoken = require("jsonwebtoken");
const app = express();
// const config = require("./App/config/auth.config")
require("dotenv").config();


const path = require('path')
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.resolve(''))
})
const whitelist = ["http://localhost:8000","http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./App/models");
//database connection
db.sequelize.sync({ force: false }).then(() => {
  console.log("database connected");
  // initial()
});
app.use(addTask);
app.use(deleteTask);
app.use(updateTask);
app.use(getAllTasks);


app.get("/", function (req, res) {
  res.send("Welcome to the backend of the BOQ system in");
});

//process.env.PORT ||
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




app.get("/", (req, res) => {
  res.status(200).send("successfully login");
});

