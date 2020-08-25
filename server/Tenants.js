// routes/api/books.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

var Tenants = express.Router();

// @route GET api/books/test
// @description tests books route
// @access Public


Tenants.get('/', (req, res) => {

 
  const db = require("./db");
  const dbName = "flatmate";
  const collectionName = "tenants";
  db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    //var itemId = req.body.userid;
    console.log("Wer"+ req.query.id);
    var itemId = req.query.id;
    dbCollection.findOne({ 'userid': itemId }, (error, result) => {
      if (error) throw error;
      
      res.json(result);
    });
  }, function (err) { // failureCallback
    throw (err);
  });




});



Tenants.post('/register', (req, res) => {
  const db = require("./db");
  const dbName = "flatmate";
  const collectionName = "tenants";
  db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
  
    dbCollection.insert(
      {
        'userid': req.body.userid,
        'type': req.body.type,
        'Area': req.body.Area,
        'Rent': req.body.Rent,
        'DatetoCome': req.body.DatetoCome,
        'HowDays': req.body.HowDays,
        'RoomFurnishing': req.body.RoomFurnishing,
        'Internet': req.body.Internet,
        'BathRoomType': req.body.BathRoomType,
        'Parking': req.body.Parking,
        'MaxNumberoflatemate': req.body.MaxNumberoflatemate,
        'picstring': req.body.picstring,
        'thisplaceisfor': req.body.thisplaceisfor,
        'myname ': req.body.myname,
        'age': req.body.age,
        'gender': req.body.gender,
        'employeestatus': req.body.employeestatus,
        'lifestyle': req.body.lifestyle,
        'abouturselfparagraph': req.body.abouturselfparagraph,
        'itemid': req.body.itemid,
        'lifestyleid':req.body.lifestyleid,
        'emploeestatusid': req.body.emploeestatusid,
        'genderid': req.body.genderid,
        'placeforid': req.body.placeforid,
        'noflatmateid': req.body.noflatmateid,
        'parkingid': req.body.parkingid,
        'oomfurnishedid': req.body.oomfurnishedid,
        'internetid': req.body.internetid,
        'bathroomid': req.body.bathroomid,



      }



      , (error, result) => {
        var _userId = result["ops"][0]["_id"];
        if (error) throw error;
        // return item
        res.json(_userId);
      });
  }, function (err) { // failureCallback
    throw (err);
  });
});






// @route GET api/books/:id
// @description Update book
// @access Public
Tenants.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
Tenants.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = Tenants;