const mongoose = require("mongoose")



const FriendDetailsSchema = new mongoose.Schema(
    {
        user: String,
        friends: [{
            "usrname" : String,
            "state": String
        }]
    },
    {
        collection: "FriendInfo",
    }
);

mongoose.model("FriendInfo", FriendDetailsSchema)