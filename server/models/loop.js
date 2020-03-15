const mongoose = require('mongoose');

// listofLoops contains loop ids created by the user.
const userConnection = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  friendIds: [String],
  listOfLoops: [String],
});

// List of people in a loop created by the user
// userId - Object id of the record in the database
// loopName  - The name of the loop created by the user
// receivingUSers - List of user object id who are part of the loop
// createdAt - Timestamp of the loop creation time
const loop = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  loopName: { type: String, required: true },
  receivingUsers: [String],
  createdAt: { type: Date, default: () => new Date() },
});

const userConnectionSchema = mongoose.model('userConnection', userConnection);
const loopSchema = mongoose.model('loop', loop);
module.exports = { Loop: loopSchema, UserConnection: userConnectionSchema };
