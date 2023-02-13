const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");

// Import schemas for DB.
require("./database_schemas/userDetails");
const User = mongoose.model("UserInfo");

// Connect to mongoDB
const uri = "mongodb+srv://team21CS194:team21CS194Password@cs194cluster.iq8hp8i.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try { 
        await mongoose.connect(uri);
        console.log("Connection to MongoDB success");
    } catch (error) {
        console.log("Connection to MongoDB failed:");
        console.log(error);
    }
}

connect();

// Middleware functions called before any API (such as /login)
app.use(express.json());

app.use(function(req, res, next){
    console.log("New Request Recieved ");
    console.log("HTTP Method: " + req.method);
    console.log("Path: " + req.path);
    console.log("Body: " + JSON.stringify(req.body));
    next();
 });

 app.use(session({
    secret: "This is a very safe secret that crypography couldn't crack",
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1, // 1 HOUR
    }
 }));
 

 app.get("/UserInfo", async (req, res) => {
    try {
        const userData = await User.find();
        res.json(userData);
    } catch (error) {
        res.statusMessage = "Failed to get Database information";
        res.status(500).end();
    }
});



app.post("/register", (req, res) => {
    const {userName, password} = req.body;

    User.find({
        username: userName
    }, (err, result) => {
        if(err){
            res.statusMessage = "User registration failed";
            return res.status(500).end();
        } else if (result.length > 0) {
            res.statusMessage = "Username already taken.";
            return res.status(500).end();
        } else {
            // No user with the given userName exists in the DB.
            User.create({
                username: userName,
                password: password,
                record: [],
            }, (err, result) => {
                if(err) {
                    res.statusMessage = "User registration failed";
                    return res.status(500).end();
                } else {
                    return res.status(200).send({ 
                        userRegistered: true,
                        registrationMessage: "User successfully registered."
                    })
                }
            });
        }
    });
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    User.find({
        username: username,
        password: password,
    }, (err, result) => {
        if(err){
            res.statusMessage = "Login failed. Server error.";
            return res.status(500).end();
        } else if (result.length == 0){
            res.statusMessage = "Username or password incorrect.";
            return res.status(500).end();
        } else {
            // The server will remmember that this user is logged in by
            // checking the session. For other API's, if req.session.username
            // does not exist, then that means the user never logged in.
            req.session.username = username;
            return res.status(200).send({ 
                isLoggedIn: true,
                userInformation: {
                    username: req.body.username,
                    password: req.body.password,
                    record: result[0].record,
                }
             })
        }
    });
});

app.post("/add-correct-question-id", (req, res) => {
    const {questionId} = req.body;

    User.updateOne(
        {username: req.session.username},
        {$push:{"record": parseInt(questionId)}},
        (err, result) => {
            if(err){
                res.statusMessage = "Record was unable to be updated.";
                return res.status(500).end();
            } else {
                // The user's record was updated! Now we need to get the
                // user and return the new userInformation.
                User.find({
                    username: req.session.username,
                }, (err, result) => {
                    if(err){
                        res.statusMessage = "Record was unable to be updated.";
                        return res.status(500).end();
                    } else if (result.length == 0){
                        res.statusMessage = "Username or password incorrect.";
                        return res.status(500).end();
                    } else {
                        return res.status(200).send({ 
                            userInformation: {
                                username: result[0].username,
                                password: result[0].password,
                                record: result[0].record,
                            }
                         })
                    }
                });
            }
    });
});

app.post("/delete", (req, res) => {
    // Example API to showcase the importance of req.session.
    // Let's say this API is deleting a user from the DB. We do not
    // want to take any params from the request. Why?
    //
    // Someone could simply include the username of ANOTHER person's account
    // in the request and then we delete that OTHER person's account. Instead,
    // we want to use the information on the server to determine who is currently
    // logged in.
    //
    // We can determine this by looking at req.session. Note that in /login, 
    // we set 'req.session.username = username'. Thus, if that field is set, then
    // we know who is logged in and whose account should be deleted. If that field is not
    // set, then we know someone is maliciously trying to delete another person's account.

    if(!req.session.username){
        res.statusMessage = "You can only delete your own account. Please log in.";
        return res.status(400).end();
    }

    const { username } = req.session;

    // We know its [username] who wants to delete their account now. Now we need to 
    // make a query on our User collection within mongoDB to delete the document with
    // that username.

    // TODO: NEED TO DELETE FROM MONGODB!
    res.statusMessage = "The server does not support deleting accounts yet";
    return res.status(500).end();
});

app.get("/logout", (req, res) => {
    if(!req.session.username){
        res.statusMessage = "You are not logged in. Can not perform a logout.";
        return res.status(400).end();
    }

    // The server is storing information in res.session (look at /login) to see
    // what info is stored (i.e. username). If the user is logging out of the client app,
    // we want them to be logged out of the server as well.
    req.session.destroy((err) => {
        return res.status(200).send({
            isLoggedIn: false,
            userInformation: {}
        })
    })
})

app.listen(5000, () => {console.log(("Server started on port 5000"))});