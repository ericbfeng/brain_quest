const mongoose = require("mongoose");



const FriendDetailsSchema = new mongoose.Schema(
    {
        user: String,
        friends: [{
            "usrname" : String,

            /* 
            State: accepted --> friends invite sent and accepted
                   rejected --> friend invite sent and rejected
                   pending --> friend invite recieved awaiting rejection/acception
                   sent --> friend invite sent but has not been accepted or rejected yet
            */
           
            "state": String
        }]
    },
    {
        collection: "FriendInfo",
    }
);

mongoose.model("FriendInfo", FriendDetailsSchema)