const mongoose = require('mongoose');

const user = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  created: { type: Date, default: () => new Date() },
});
const userSchema = mongoose.model('user', user);
module.exports = {
  User: userSchema,
};
