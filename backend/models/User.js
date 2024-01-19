const mongoose  = require("mongoose");
const uniqueValidatir = require("mongose-unique-validator");

const userSchema = mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type:String, require: true}
});
userSchema.plugin(uniqueValidatir);
module.exports = mongoose.model("User", userSchema)