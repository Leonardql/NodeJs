const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();

let users = {};
let query = "select * from users;";


router.get('/', function(req, res, next) {
    connection.query(query,  function (err, rows) {
        if(err) throw err;
        users['users'] = rows;
        res.send(users)
    });
});


module.exports = router;
