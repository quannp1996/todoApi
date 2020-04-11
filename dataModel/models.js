const mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost/todoList');
const UserShema = new mongoose.Schema({
    email    : String,
    username : String,
    password : String,
    typeUser : Number
})
module.exports.UserModel = mongoose.model('users', UserShema);
const listShema = new mongoose.Schema({
    value: String,
    checked: Boolean,
    user: String
})
module.exports.ItemModel = mongoose.model("item", listShema);