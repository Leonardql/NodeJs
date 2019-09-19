const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();

let testimonials = {};
let query1 = "select * from testimonials";


 router.get('/', function(req, res, next) {
     connection.query(query1,  function (err, rows) {
         if(err) throw err;
         testimonials['testimonials'] = rows;
         res.send(testimonials)
     });
 });


module.exports = router;



