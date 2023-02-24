const mongoose = require("mongoose")

const UserDetailsSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        occupation: String,
        record: [Number],
        friends: [{
            "usrname" : String,
            "state": String
        }]
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema)