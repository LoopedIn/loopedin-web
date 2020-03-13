const mongoose = require('mongoose');

// listofLoops contains loop ids created by the user.
const userConnection = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  friendIds: [String],
  listOfLoops: [String],
});

// List of people in a loop created by the user
const loop = mongoose.Schema({
  loopId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  loopName: { type: String, required: true },
  receivingUsers: [String],
  createdAt: { type: Date, default: () => new Date() },
});

const userConnectionSchema = mongoose.model('userConnection', userConnection);
const loopSchema = mongoose.model('loop', loop);
module.exports = { Loop: loopSchema, UserConnection: userConnectionSchema };
