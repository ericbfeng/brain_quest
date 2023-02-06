const mongoose = require("mongoose")

const UserDetailsSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        occupation: String
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema)