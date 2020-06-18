const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
    console.log("Post Recieved.");

    const url = "https://sv443.net/jokeapi/v2/joke/Programming?type=single";
    https.get(url, function (response) {


        response.on("data", function (data) {
            const jokeData = JSON.parse(data);
            const progJoke = jokeData.joke;

            console.log(progJoke);

            const h1Prop = "display-4";

            res.write("<h1>");
            res.write(progJoke);
            res.write("</h1>");
            res.send();


        });
    });
});

app.listen(3000, function () {
    console.log("Server running on port 3000.");
});

