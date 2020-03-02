const mongoose = require('mongoose');

const user = mongoose.Schema({
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  tokenSeed: { type: String, required: true, unique: true },
  created: { type: Date, default: () => new Date() }
});
const userSchema = mongoose.model("user", user);
module.exports = { 
  User: userSchema
}