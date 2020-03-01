const postSchema = mongoose.Schema({
    postId: { type: String, required: true ,unique: true },
    senderId: { type: String, required: true},
    receivingUserIds: [ String ] ,
    receivingLoopIds: [ String ],
    postType: {type: String, required: true, enum: ['text', 'image', 'video']},
    postContent: {type: String, reuired: true },
    created: { type: Date, default: () => new Date() }
  });
  
  const messageSchema = mongoose.Schema({
    messageId: { type: String, required: true ,unique: true },
    senderId: { type: String, required: true},
    receivingUserId: {type:  String , required: true},
    messageType: {type: String, required: true, enum: ['text', 'yo', 'reply']},
    messageContent: {type: String, reuired: true },
    created: { type: Date, default: () => new Date() },
    readAt: {type: Date}
  });
  
  const postAccessSchema = mongoose.Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true},
  });

  const Post = (module.exports = mongoose.model("post", postSchema));
  const Message = (module.exports = mongoose.model("message", messageSchema));
  const PostAccess = (module.exports = mongoose.model("postAccess", postAccessSchema));