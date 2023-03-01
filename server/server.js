const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");

const server = app.listen(5000, () => {console.log(("Server started on port 5000"))});

// ----------------------------------------------------------------------
// Logic for database connection and schema loading.
// ----------------------------------------------------------------------

require("./database_schemas/userDetails");
const User = mongoose.model("UserInfo");



require("./database_schemas/friendDetails");
const Friend = mongoose.model("FriendInfo");

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

// ----------------------------------------------------------------------
// Middleware functions called before any API (such as /login)
// ----------------------------------------------------------------------

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

app.post("/getUser/", async (req, res) => {
    const {userName} = req.body;
    console.log("Grabbing information on ", userName);
    try {
        const userData = await User.find({username: userName});
        res.json(userData);
    } catch (error) {
        res.statusMessage = "Failed to get Database information";
        res.status(500).end();
    }
});





 // ----------------------------------------------------------------------
 // APIs that are used by the application.
 // ----------------------------------------------------------------------

 app.post("/register", (req, res) => {
    const { userName, password, occupation } = req.body;
    User.find(
      {
        username: userName,
      },
      (err, result) => {
        if (err) {
          res.statusMessage = "User registration failed";
          return res.status(500).end();
        } else if (result.length > 0) {
          res.statusMessage = "Username already taken.";
          return res.status(500).end();
        } else {
          // No user with the given userName exists in the DB.
          User.create(
            {
              username: userName,
              password: password,
              occupation: occupation,
              record: [],
            },
            (err, user) => {
              if (err) {
                res.statusMessage = "User registration failed";
                return res.status(500).end();
              } else {
                // User created successfully, now create a new friend
                Friend.create(
                  {
                    user: userName,
                    friends: [],
                  },
                  (err, friend) => {
                    if (err) {
                      res.statusMessage = "User registration failed";
                      return res.status(500).end();
                    } else {
                      console.log(friend)
                      return res.status(200).send({
                        userRegistered: true,
                        registrationMessage: "User successfully registered.",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    User.find({
        username: username,
        password: password
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
                    occupation: result[0].occupation,
                    record: result[0].record,
                }
             })
        }
    });
});



/* 
* API used to get list of friends of user

**/

app.get("/getfriends", async function (request, response) {
    if (!request.session.username) {
      response.status(401).send("Please Sign in First");
      return;
    }
    console.log(request.session.username);
    try {
      let friend = await Friend.findOne({ user: request.session.username });
      if (!friend) {
        response.status(404).send("No friends found for this user");
        return;
      }
      response.status(200).send(friend.friends);
    } catch (err) {
      response.status(400).send(err.message);
    }
  });


app.get("/getfriends/:user", async function(request, response){
  let user = request.params.user;
  try {
    let friend = await Friend.findOne({ user: user });
    if (!friend) {
      response.status(404).send("No friends found for this user");
      return;
    }
    response.status(200).send(friend.friends);
  } catch (err) {
    response.status(400).send(err.message);
  }
});

app.get("/userById/:id", async function(request, response){
  let id = request.params.id
  try{
    let user = await User.findById(id).exec();
    if (!user){
      response.status(404).send($`User ${id} not found in database`);
    }
    response.status(200).send(user);
  } catch (err){
    response.status(400).send(err.message);
  }
});

//Quick add friend (used for testing)
// app.put("/quickadd",  async (req, res) => {
//   console.log("quickadd");
//   if (!req.session.username) {
//     res.status(401).send("Please Sign in First");
//     return;
//   }
//   const username  = req.session.username;
//   const friendName  = req.body;
//   try {
//   // Find the user by username
//   const user = await Friend.findOne({ user: username });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   const friend = await Friend.findOne({ user: friendName.friendName });
//   if (!friend) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   let there = false;
//   for (let i = 0; i < user.friends.length; i++){
//     if (user.friends[i]["usrname"] === friendName.friendName){
//       user.friends[i]["state"] = "accepted";
//       there = true;
//     }
//   }
//   if (!there) user.friends.push({usrname: friendName.friendName, state: "accepted" } );

//   there = false
//   for (let i = 0; i < friend.friends.length; i++){
//     if (friend.friends[i]["usrname"] === user){
//       friend.friends[i]["state"] = "accepted";
//     }
//     there = true;
//   }
//   if (!there) friend.friends.push({usrname: user, state: "accepted" } );

//   await user.save();
//   await friend.save();
//   return res.status(200).json({ message: "Quick add was a success" });

// } catch (e){
//   return res.status(500).json({ message: e.message });
// }

// });

// Unfriends a user by removing both users from each other friends list 
app.put("/unfriend", async (req, res) => {    

  console.log("unfriend  API  called");

  if (!req.session.username) {
    res.status(401).send("Please Sign in First");
    return;
  }
  const username  = req.session.username;
  const friendName  = req.body.friend;

  try{

    async function removeUserFromFriendList(user, name){
      index = -1
      for (let i = 0; i < user.friends.length; i++){
        if (user.friends[i]["usrname"] === name){
          index = i;
          break;
        }
      }

      if (index === -1){
        return false;
      } else {
        let newArr = user.friends;
        newArr.splice(index, 1);
        user.friends = newArr;
        console.log(user);
        await user.save();
        return true;
      }
    }
    
    // First remove friend on users friend list
    let user = await Friend.findOne({ user: username });
    if (!user || !user.friends) {
      return res.status(404).json({ message: "User not found" });
    }

    // Now to remove user from the friend's friend list
    let friend = await Friend.findOne({ user: friendName });
    if (!friend || !friend.friends) {
      return res.status(404).json({ message: "Friend not found" });
    }

    if (await removeUserFromFriendList(user, friendName) && await removeUserFromFriendList(friend, username)){
      return res.status(200).json({ message: "Friend removed" });
    } else{
      return res.status(404).json({ message: "User not found" });
    }

  } catch(e){
    return res.status(500).json({ message: e.message });
  }

  
});

// Sends and accepts friend requests 
app.put("/friends", async (req, res) => {

  if (!req.session.username) {
      res.status(401).send("Please Sign in First");
      return;
  }
  const username  = req.session.username;
  const friendName  = req.body;
  try {
    // Find the user by username
    const friend_list = await Friend.findOne({ user: username });
    // If the user is not found, return a 404 error
    if (!friend_list) {
      return res.status(404).json({ message: "User not found" });
    }


    // This function will add user to the someones friend list with "state" and will return "ret"
    async function setFriend(friendName, state, ret){
      const other_friend = await Friend.findOne({user : friendName});

      // Check if they exist/if they have friend list (older user may not)
      if (!other_friend.friends) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the user in the friends list and update 
      for (let i = 0; i < other_friend.friends.length; i++){
        if (other_friend.friends[i]["usrname"] === username.toString().trim()){
          other_friend.friends[i]["state"] = state;
          await other_friend.save();
          return res.status(200).json(ret);
        }
      }
      
      // User was not found in friend list so add them
      other_friend.friends.push({usrname: username , state: "pending" } );
      await other_friend.save(); 
      return res.status(200).json(ret);  
    }

    // Check if the friend is already added is some capicity
    for (let i = 0; i < friend_list.friends.length ; i++) {
      let curr = friend_list.friends[i]
      if(curr["usrname"] === friendName.friendName){
        // If state "is sent" we are waiting for a reply
        if (curr["state"] === "sent"){
          return res.status(200).json({ message: "Friend request already sent" })
        }
        // If state is pending we are accepting someone elses friend request
        if (curr["state"] === "pending"){
          curr["state"] = "accepted";
          await friend_list.save();
          return await setFriend(friendName.friendName, "accepted", {
            message: `Accepted ${friendName}, as friend of ${username}`,
            friend_list
          });
          
        }
        // If state is rejected change it to sent
        if (curr["state"] === "rejected"){
          curr["state"] = "sent"
          await friend_list.save();
          return await setFriend(friendName.friendName, "pending", {
            message: `Sent friend request to ${friendName}, from ${username}`,
            friend_list
          });
          
        }
        // If state is accepted do nothing 
        return res.status(200).json({ message: "User already added" })
      };
    }

    // Add friend to user friend list (sent until they confirm it)
    friend_list.friends.push({usrname: friendName.friendName, state: "sent" } );
    await friend_list.save();
    return await setFriend(friendName.friendName, "pending", {
      message: `Sent friend request to ${friendName}, from ${username}`,
      friend_list
    });

  } catch (error) {
    // If an error occurs, return a 500 error with the error message
    return res.status(500).json({ message: error.message });
  }
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

// ----------------------------------------------------------------------
// Socket.io logic (enables bicommunication between clients / server)
// ----------------------------------------------------------------------

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const teamToSocketId = {};
const socketIdToTeam = {};
const teamsWhoStartedQuiz = new Set();

io.on('connection', socket => {
  const connectionSocketId = socket.id;
  console.log("SOCKET JOINED: " + connectionSocketId);

  socket.on('send_message', ({name, message}) => {
    io.emit('message_recieved', {name, message});
  });

  socket.on('create_team', ({username}) => {
    // Note that the username is both the room name
    // and the person who created the room.
    socket.join(username);
    teamToSocketId[username] = connectionSocketId;
    socketIdToTeam[connectionSocketId] = username;
    io.emit('user_created_a_team', {username});
  });

  socket.on('user_wants_to_join_team', ({team, username}) => {
    if(!io.sockets.adapter.rooms.get(team) || teamsWhoStartedQuiz.has(team)){
        io.emit('user_failed_to_join_team', {team, username});
        return;
    }
    socket.join(team);
    io.to(team).emit("user_joined_team", {team, teamLeaderSocketId: teamToSocketId[team], username, socketId: socket.id});
  });

  socket.on('indicate_user_left_page', ({teamName}) => {
    // If the leader leaves, then delete the room.
    if (connectionSocketId in socketIdToTeam) {
        console.log("LEADER LEFT. ROOM BEING DELETED");
        teamsWhoStartedQuiz.delete(teamName);
        io.in(socketIdToTeam[connectionSocketId]).socketsLeave(socketIdToTeam[connectionSocketId]);
    } else {
        // If a member leaves the room, we don't want them to be subscribed to that
        // team anymore. 
        console.log("MEMBER LEFT: " + teamName);
        socket.leave(teamName);
    }
    io.emit('user_left_team_page', {socketId: connectionSocketId});

  });

  socket.on('signal_quiz_start_to_team', ({team, numQuizQuestions}) => {
    teamsWhoStartedQuiz.add(team);
    io.to(team).emit("leader_started_quiz", ({numQuizQuestions}));
  });

  socket.on('signal_answer_attempt_to_team', ({team, correct, username}) => {
    io.to(team).emit("answer_was_attempted", {correct, username});
  });

  socket.on('signal_scores_to_team', ({team, teamMembers, answerAttempts}) => {
    io.to(team).emit("scores_page_ready", {teamMembers, answerAttempts});
  });

  socket.on('team_send_message', ({name, message, team}) => {
    io.to(team).emit("team_message_recieved", {name, message});
  });

  socket.on('disconnect', function(socket){
    console.log("SOCKET LEFT: " + connectionSocketId);
    io.emit('user_left_team_page', {socketId: connectionSocketId});

    console.log(JSON.stringify(socketIdToTeam));
    // If the leader left the room, then delete the room.
    if (connectionSocketId in socketIdToTeam) {
        console.log("LEADER LEFT. ROOM BEING DELETED");
        teamsWhoStartedQuiz.delete(socketIdToTeam[connectionSocketId]);
        io.in(socketIdToTeam[connectionSocketId]).socketsLeave(socketIdToTeam[connectionSocketId]);
    }
  });
})

