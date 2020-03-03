const mongoose = require('mongoose');

const userConnection = mongoose.Schema({
    userId: { type: String, required: true ,unique: true },
    friendIds: [String],
    listOfLoops: [String]
  });
const loop = mongoose.Schema({
    loopId: { type: String, required: true ,unique: true },
    userId: { type: String, required: true },
    loopName: { type: String, required: true},
    receivingUsers: [String],
    createdAt: { type: Date, default: () => new Date() }
});

const userConnectionSchema = mongoose.model("userConnection", userConnection);
const loopSchema = mongoose.model("loop", loop);
module.exports = { Loop: loopSchema, userConnection: userConnectionSchema}