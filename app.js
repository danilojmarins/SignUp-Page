const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
})


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})


app.post('/', (req, res) => {
    
    let firstName = req.body.firstname.trim().charAt(0).toUpperCase() + req.body.firstname.trim().slice(1).toLowerCase();
    let lastName = req.body.lastname.trim().charAt(0).toUpperCase() + req.body.lastname.trim().slice(1).toLowerCase();
    let email = req.body.email.trim().toLowerCase();
    console.log(firstName + ' ' + lastName);
    console.log(email);

    res.sendFile(__dirname + '/success.html');

})