const express = require('express');
const router = express.Router();

const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();

let orders = {};
let query = "select * from orders";


 router.get('/', function(req, res, next) {
     connection.query(query,  function (err, rows) {
         orders['orders'] = rows;
         res.send(orders)
     });
 });





module.exports = router;



