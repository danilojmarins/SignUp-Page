const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const response = require('express');
const path = require('path');
require('dotenv').config({path: '/app/.env'});

const app = express();


const listID = process.env.LIST_ID;
const apiKey = process.env.API_KEY;

console.log(process.env);
console.log(__dirname);

app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: 3000.`);
})


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})


app.post('/', (req, res) => {
    
    const firstName = req.body.firstname.trim().charAt(0).toUpperCase() + req.body.firstname.trim().slice(1).toLowerCase();
    const lastName = req.body.lastname.trim().charAt(0).toUpperCase() + req.body.lastname.trim().slice(1).toLowerCase();
    const email = req.body.email.trim().toLowerCase();
    console.log(firstName + ' ' + lastName);
    console.log(email);


    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const jsonData = JSON.stringify(data);

    const url = `https://us14.api.mailchimp.com/3.0/lists/${listID}`;

    const options = {
        method: 'POST',
        auth: `danilojmarins:${apiKey}`
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', (data) =>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})


app.post('/failure', (req, res) => {
    res.redirect('/');
})