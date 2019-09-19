const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();

let invintations = {};
let query1 = "select * from invintations";


 router.get('/', function(req, res, next) {
     connection.query(query1,  function (err, rows) {
         invintations['invintations'] = rows;
         res.send(invintations)
     });
 });


module.exports = router;



