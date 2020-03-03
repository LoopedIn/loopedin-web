const mongoose = require('mongoose');

  const post = mongoose.Schema({
    senderId: { type: String, required: true},
    receivingUserIds: [ String ] ,
    receivingLoopIds: [ String ],
    postType: {type: String, required: true, enum: ['text', 'image', 'video']},
    postContent: {type: String, required: true },
    created: { type: Date, default: () => new Date() }
  });

  const test = mongoose.Schema({
    testVal: {type: String, required: true, unique: true}
  })
  
  const message = mongoose.Schema({
    senderId: { type: String, required: true},
    receivingUserId: {type:  String , required: true},
    messageType: {type: String, required: true, enum: ['text', 'yo', 'reply']},
    messageContent: {type: String, required: true },
    created: { type: Date, default: () => new Date() },
    readAt: {type: Date}
  });
  
  const postAccess = mongoose.Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true},
  });

  const postSchema = mongoose.model("post", post);
  const messageSchema = mongoose.model("message", message);
  const postAccessSchema = mongoose.model("postAccess", postAccess);
  const testSchema = mongoose.model("test", test);

module.exports = { 
  Post: postSchema, 
  Message: messageSchema , 
  PostAccess: postAccessSchema,
  Test: testSchema
}
