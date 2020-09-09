// routes/api/books.js
const express = require('express');
var Connection = require('tedious').Connection;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var Request = require('tedious').Request;
var uuid = require('node-uuid');
var async = require('async');
var Users = express.Router();
var sql = require("mssql");

Users.get('/login', (req, res) => {
  var itememail = req.query.email;
  var itempassword = req.query.password;
  var db = require("./db");
  var data = [];
  data.push(itememail);
  data.push(itempassword);
  
  db.LoginUser(data, function (err, rows) {
    if (err) {  
    } else if (rows) {
      // Process the rows returned from the database
      res = res.json(rows);
      //console.log('Reapnose is ->'+res);
      return res;
    } else {
      // No rows returns; handle appropriately
    }
  }); //DB.LOG IS END


});


Users.post('/register', (req, res) => {
  var itememail = req.body.params.email;
  var itemname = req.body.params.userid;
  var itemphone = req.body.params.phone;
  var itempassword = req.body.params.password;
  const id = req.body.params.userid;
  var db = require("./db");
  var data = [];
  data.push(itememail);
  data.push(itemname);
  data.push(itemphone);
  data.push(itempassword);
  db.Registeruser(data, function (err, rows) {
    if (err) {  
    } else if (rows) {
      // Process the rows returned from the database
      res = res.json(rows);
      //console.log('Reapnose is ->'+res);
      return res;
    } else {
      // No rows returns; handle appropriately
    }
  });



  //console.log('Reapnose is ->'+result);





});

function failureCallback(err) {
  console.log(err);
}



module.exports = Users;