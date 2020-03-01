const userConnectionsSchema = mongoose.Schema({
    userId: { type: String, required: true ,unique: true },
    friendIds: [String],
    listOfLoops: [String]
  });
const loopSchema = mongoose.Schema({
    loopId: { type: String, required: true ,unique: true },
    userId: { type: String, required: true },
    loopName: { type: String, required: true},
    receivingUsers: [String],
    createdAt: { type: Date, default: () => new Date() }
});

const UserConnection = (module.exports = mongoose.model("userConnection", userConnectionsSchema));
const Loop = (module.exports = mongoose.model("loop", loopSchema));