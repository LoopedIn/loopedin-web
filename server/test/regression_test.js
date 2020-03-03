const assert = require('assert');
var axios = require("axios");
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');


axiosCookieJarSupport(axios);
const {server,mongoose} = require('../lib/server');
const PORT = 3000;

describe('application', async () => {

let client = {};
let server2 = {};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = `http://localhost:${PORT}/`;
axios.defaults.validateStatus = () => true;

before(async () => {
  client = axios.create();
  // make a new cookie jar every time you create a new client
  client.defaults.jar = new tough.CookieJar();
  server2 = server.listen(PORT);
});

after(async () => {
  mongoose.connection.close();
  await server2.close();
});


  function getRandomCreateUserInput(){
    return {
     
    };
  }

  async function createLoop(userId, loopName){

  }

  async function updateLoopName(loop_id, newLoopName){

  }


  async function createUser(){
    const userInput = getRandomCreateUserInput();
    const result = await client.post("/users/create", userInput);
    return result;
  }

  async function addAsFriend(user1Id, user2Id){
      const addFriendInput = {
      'userId': user2Id.id
    };
    return await client.post("/users/" + user1Id + "/add_friend", addFriendInput);
  }

  async function addFriendToLoop(loopId, friendId){
    return {};
  }

  async function removeFriendFromLoop(loopId, friendId){
    return {};
  }

  function resultToUser(result){
    return {};
  }

  async function sendMessage(userId, friendId, messageContent){
    return {};
  }

  function resultToLoop(result){
    return {};
  }

  async function sendPostFromUser(myUserId, allowedLoops, allowedUsers, myUsersPostContent){
    return {};
  }

  describe('authenticated state', async () => {
    describe('Managing friends and loops', async () => {
      it('Create a user', async () => {
        assert.strictEqual(createUser().status,200);
      });

      it('Add a user as a friend ', async () => {
        const myUser = resultToUser(createUser());
        const myUsersFriend = resultToUser(createUser());
        assert.strictEqual(addAsFriend(myUser.id, myUsersFriend.id),200);
      });

      it('Create a loop ', async () => {
        const myUser = resultToUser(createUser());
        assert.strictEqual(createLoop(myUser.id),200);
      });

      it('Create a loop with a duplicate name (not allowed)', async () => {
        const myUser = resultToUser(createUser());
        const loop = createLoop(myUser.id);
        const duplicateLoopReqResponse = createLoop(myUser.id, loop.name);
        assert.strictEqual(duplicateLoopReqResponse.status, 400);
      });
      
      it("Update a loop's name to a duplicate name (not allowed)", async () => {
        const myUser = resultToUser(createUser());
        const loop1 = createLoop(myUser.id);
        const loop2 = createLoop(myUser.id);
        const updateNameReqResponse = updateLoopName(loop2.id, loop1.name);
        assert.strictEqual(updateNameReqResponse.status, 400);
      });

      it('Add a friend to a loop ', async () => {
        const myUser = resultToUser(createUser());
        const myUsersFriend = resultToUser(createUser());
        addAsFriend(myUser.id, myUsersFriend.id);
        const loop = createLoop(myUser.id);
        const addFriendToLoopReqResponse 
          = addFriendToLoop(loop.id,  myUsersFriend.id);
        assert.strictEqual(addFriendToLoopReqResponse.status, 200);
      });

      it('Remove a friend from a loop ', async () => {
        const myUser = resultToUser(createUser());
        const myUsersFriend = resultToUser(createUser());
        addAsFriend(myUser.id, myUsersFriend.id);
        const loop = createLoop(myUser.id);
        addFriendToLoop(loop,  myUsersFriend.id);
        const result = removeFriendFromLoop(loop.id, myUsersFriend.id);
        assert.strictEqual(result.status, 200);
      });
    });

    describe('Private messages', async () => {
      it('Send a message to a user ', async () => {
        const myUser = resultToUser(createUser());
        const myUsersFriend = resultToUser(createUser());
        addAsFriend(myUser.id, myUsersFriend.id);
        const message = "Hello";
        const result = sendMessage(myUser.id, myUsersFriend.id, message);
        assert.strictEqual(result.status, 200);
      });
      it('Recieve messages from other users ', async () => {}); //TBD
      it('Read chat history with a user ', async () => {}); //TBD
    });

    describe('Post sharing', async () => {
      it('Create a post and share with a list of loops', async () => {
        const myUser = resultToUser(createUser());
        const myUsersFriend = resultToUser(createUser());
        addAsFriend(myUser.id, myUsersFriend.id);
        const loop1 = createLoop(myUser.id);
        const loop2 = createLoop(myUser.id);
        const allowedLoops = [loop1.id, loop2.id];
        const allowedUsers = [myUsersFriend.id];
        const myUsersPostContent = "Hello all";
        const result = sendPostFromUser(myUser.Id, allowedLoops, allowedUsers, myUsersPostContent);
        assert.strictEqual(result.status, 200);
      });

      it('Incorrect loop names in above request (not allowed)', async () => {
        const myUser = resultToUser(createUser());
        const myUsersFriend = resultToUser(createUser());
        addAsFriend(myUser.id, myUsersFriend.id);
        const loop1 = createLoop(myUser.id);
        const allowedLoops = [loop1.id, '123'];
        const allowedUsers = [myUsersFriend.id];
        const myUsersPostContent = "Hello all";
        const result = sendPostFromUser(myUser.Id, allowedLoops, allowedUsers, myUsersPostContent);
        assert.strictEqual(result.status, 200);
      });

      it('User views their own posts ', async () => {}); //TBD
      it('User deletes their post', async () => {}); //TBD
    });
  //   describe('Post sharing', async () => {
  //     // it(' Create a post and share with a list of loops', async () => {
  //     //   return client.post("/create-post", { postId: "testpost",
  //     //   senderId: "sender",
  //     //   receivingUserIds: "receiver" ,
  //     //   receivingLoopIds: "loop",
  //     //   postType: "image",
  //     //   postContent:"helloworld"});


    describe('Feed', async () => {
      it('User reads all posts shared to them', async () => {}); //TBD
      it('User replies to a post shared to them', async () => {}); //TBD
    });
  });

});
