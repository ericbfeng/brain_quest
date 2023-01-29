const express = require("express")
const app = express()

// This middleware function is called before any API. 
// i.e. all requests are being logged here prior to the 
// server handling them.
app.use(function(req, res, next){
    console.log("Request recieved at " + Date.now());
    console.log("HTTP Method: " + req.method);
    console.log("Path: " + req.path);
    next();
 });

app.get("/some-api", (req, res) => {
    return res.send({ "payload": "This Is The Server Response For /some-api" })
});

app.listen(5000, () => {console.log(("Server started on port 5000"))});