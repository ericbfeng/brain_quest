const express = require("express")

const app = express()

app.use(express.json());

// This middleware function is called before any API. 
// i.e. all requests are being logged here prior to the 
// server handling them.
app.use(function(req, res, next){
    console.log("New Request Recieved ");
    console.log("HTTP Method: " + req.method);
    console.log("Path: " + req.path);
    console.log("Body: " + JSON.stringify(req.body));
    next();
 });

app.post("/login", (req, res) => {
    // Actually use a DB (probably mongoDB) to check if the user exists and
    // if the provided username / password are correct. Furthermore, need to 
    // add middleware to store user sessions (express).

    return res.send({ 
        isLoggedIn: true,
        userInformation: {
            username: req.body.username,
            password: req.body.password
        }
     })
});

app.get("/logout", (req, res) => {
    // Need to add middleware to store user sessions (express). In this API,
    // the user should be logged out of the server (their session destroyed).

    return res.send({
        isLoggedIn: false,
        userInformation: {}
    })
})

app.listen(5000, () => {console.log(("Server started on port 5000"))});