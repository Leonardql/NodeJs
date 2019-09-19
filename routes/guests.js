const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();


let query = "select * from guests";
let guests = {};
let message = {};

router.get('/', function(req, res, next) {
    connection.query(query,  function (err, rows) {
        if(err) throw err;
        guests['guests'] = rows;
        res.send(guests)
    });
});



router.post("/createguest", function (req ,res) {
    let query = `INSERT INTO guests 
            (
                event_id, firstName, lastName, role
            )
            VALUES
            (
                ?, ?, ?, ?
            )`;
    let event_id = req.body.event_id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let role = req.body.role;
    connection.query(query,[event_id, firstName, lastName, role], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been added to the database";
        res.send(message)


    });



});

router.put("/updateguest", function (req ,res) {
    let query = `UPDATE guests 
                set event_id = ?, firstName = ?, lastName = ?, role = ?
                where guest_id = ?`;

    let guest_id = req.body.guest_id;
    let event_id = req.body.event_id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let role = req.body.role;
    connection.query(query,[event_id, firstName, lastName, role, guest_id], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been updated";
        res.send(message)


    });



});


module.exports = router;


