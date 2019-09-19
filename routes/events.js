const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();

let query = "select * from events;";
let events = {};
let message = {};


router.get('/', function(req, res, next) {
    connection.query(query,  function (err, rows) {
        if(err) throw err;
        events['events'] = rows;
        res.send(events)
    });
});


router.post("/createevent", function (req ,res) {
    let query = `INSERT INTO events
            (
                title, date, city, street, country, postal, info, about_the_party
            )
            VALUES
            (
                ?, ?, ?, ?,?,?,?,?
            )`;
    let title = req.body.title;
    let date = req.body.date;
    let city = req.body.city;
    let street = req.body.street;
    let country = req.body.country;
    let postal = req.body.postal;
    let info = req.body.info;
    let about_the_party = req.body.about_the_party;
    connection.query(query,[title, date, city, street, country, postal, info, about_the_party], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been added to the database";
        res.send(message)
    });
});


router.put("/updateevent", function (req ,res) {
    let query = `UPDATE events
                set title = ?, date = ?, city = ?, street = ?, country = ? , postal = ?, info = ?, about_the_party = ?
                where event_id = ?`;

    let event_id = req.body.event_id;
    let title = req.body.title;
    let date = req.body.date;
    let city = req.body.city;
    let street = req.body.street;
    let country = req.body.country;
    let postal = req.body.postal;
    let info = req.body.info;
    let about_the_party = req.body.about_the_party;
    connection.query(query,[title, date, city, street, country, postal, info, about_the_party, event_id], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been updated";
        res.send(message)
    });
});

module.exports = router;



