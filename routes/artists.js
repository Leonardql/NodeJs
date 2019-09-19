const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const config = require('../config/config.json');

const connection = mysql.createConnection(config);
connection.connect();

const query = "select * from artists";
const artists = {};
const message = {};



 router.get('/', function(req, res, next) {
     connection.query(query,  function (err, rows) {
         if(err) throw err;
         artists['artists'] = rows;
         res.send(artists)
     });
 });



router.post("/createartist", function (req ,res) {
    let query = `INSERT INTO artists 
            (
                event_id, firstName, lastName, role, motto, facebook_link, instagram_link, twitter_link
            )
            VALUES
            (
                ?, ?, ?, ?,?,?,?,?
            )`;
    let event_id = req.body.event_id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let role = req.body.role;
    let motto = req.body.motto;
    let facebook_link = req.body.facebook_link;
    let instagram_link = req.body.instagram_link;
    let twitter_link = req.body.twitter_link;
    connection.query(query,[event_id, firstName, lastName, role, motto, facebook_link, instagram_link, twitter_link], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been added to the database";
        res.send(message)


    });
});


router.put("/updateartist", function (req ,res) {
    let query = `UPDATE artists 
                set event_id = ?, firstName = ?, lastName = ?, role = ?, motto =? , facebook_link = ?, instagram_link = ?, twitter_link = ?
                where artist_id = ?`;

    let event_id = req.body.event_id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let role = req.body.role;
    let motto = req.body.motto;
    let facebook_link = req.body.facebook_link;
    let instagram_link = req.body.instagram_link;
    let twitter_link = req.body.twitter_link;
    let artist_id = req.body.artist_id;
    connection.query(query,[event_id, firstName, lastName, role, motto, facebook_link, instagram_link, twitter_link, artist_id], function (err, rows) {
        if(err) throw err;
        message['message'] = "record has been Updated";
        res.send(message)


    });
});
module.exports = router;



