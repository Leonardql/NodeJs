const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();


let query = "select * from tickets";
let tickets = {};
let message = {};

 router.get('/', function(req, res, next) {
     connection.query(query,  function (err, rows) {
         if(err) throw err;
         tickets['tickets'] = rows;
         res.send(tickets)
     });
 });


router.post("/createticket", function (req ,res) {

    let query = `INSERT INTO tickets 
            (
                event_id, title, price, persons_allowed, hour_limitation
            )
            VALUES
            (
                ?, ?, ?,?,?
            )`;
    let event_id = req.body.event_id;
    let title = req.body.title;
    let price = req.body.price;
    let persons_allowed = req.body.persons_allowed;
    let hour_limitation = req.body.hour_limitation;

    connection.query(query,[event_id, title, price, persons_allowed, hour_limitation], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been added to the database";
        res.send(message)
    });



});

router.put("/updateticket", function (req ,res) {

    let query = `UPDATE tickets 
                set event_id = ? , title = ? , price = ? , persons_allowed = ?, hour_limitation = ?
                where ticket_id = ?`;

    let ticket_id = req.body.ticket_id;
    let event_id = req.body.event_id;
    let title = req.body.title;
    let price = req.body.price;
    let persons_allowed = req.body.persons_allowed;
    let hour_limitation = req.body.hour_limitation;

    connection.query(query,[event_id, title, price, persons_allowed, hour_limitation, ticket_id], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been updated";
        res.send(message)
    });



});

module.exports = router;



