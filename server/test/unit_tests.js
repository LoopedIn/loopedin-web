const assert = require('assert');
const axios = require("axios");
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
axiosCookieJarSupport(axios);

const {mongoose,serverListener} = require('../lib/server');
const PORT = 3000;

const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyC6TeyOiJlhVEtjjqkAnJ2-8Z6N8wT9E8k",
  authDomain: "loopedinauth.firebaseapp.com",
  databaseURL: "https://loopedinauth.firebaseio.com",
  projectId: "loopedinauth",
  storageBucket: "loopedinauth.appspot.com",
  messagingSenderId: "660168003334",
  appId: "1:660168003334:web:8ce7ed9ea45aed347c9887",
  measurementId: "G-RWPPQQFLE5"
};

const myFirebase = firebase.initializeApp(firebaseConfig);
myFirebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

describe('application', async () => {

  let client = {};
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `http://localhost:${PORT}/`;
  axios.defaults.validateStatus = () => true;

  before(async () => {
    client = axios.create();
    // make a new cookie jar every time you create a new client
    client.defaults.jar = new tough.CookieJar();
  });

  after(async () => {
    mongoose.connection.close();
    await serverListener.close();
  });

  function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  function getRandomCreateUserInput(){
    const random = randomString(5);
    return {
      userId: random,
      email: random + '@email.com',
      firstName: random + '_fn',
      lastName: random + '_ln',
      password: random + '_pass'
    };
  }

  async function createLoop(myUserInput, loopName, receivingUsers){
    console.log(receivingUsers)
    const random = randomString(5);
    if(loopName === undefined){
      loopName = random;
    }
    const createLoopInput = {
      'loopName': loopName,
      'receivingUsers': receivingUsers
    }
    const response = await sendAuthenticatedRequest(myUserInput, "/users/create_loop", createLoopInput);
    return response.data;
  }

  async function updateLoopName(loop_id, newLoopName){
    const updateLoopInput = {
      'loopName': newLoopName
    }
    
    return await client.post("/loops/" +  loop_id + "/update", updateLoopInput);
  }

  async function createUserApi(token, userName, firstName, lastName, email){
    const input  = {
      'authToken' : token,
      'userName' : userName,
      'firstName' : firstName,
      'lastName' : lastName,
      'email' : email
    }
    return sendUnAuthenticatedRequest("/users/create", input);
  }

  async function addAsFriend(myUserInput, user2Id){
    const addFriendInput = {
      'friendIds' : [user2Id],
    };
    const response = await sendAuthenticatedRequest(myUserInput, "users/add_friend", addFriendInput);
    return response;
  }

  async function addFriendToLoop(loopId, friendId){
    const updateLoopInput = {
      'friendIds' : [friendId],
    }
    return await client.post("/loops/" +  loopId + "/update", updateLoopInput);
  }

  async function removeFriendFromLoop(loopId){
    const updateLoopInput = {
      'friendIds' : [],
      'loop_id': loopId
    }
    return await client.post("/loops/" +  loopId + "/update", updateLoopInput);
  }

  function resultToUser(result){
    return {id: result['_id']};
  }

  async function sendMessage(userId, friendId, messageContent){
    const messageInput = {
      'senderId' : userId,
      'receivingUserId': friendId,
      'messageType' : 'text',
      messageContent
    }
    return await client.post("/users/" + userId + "/send_message", messageInput);
  }

  async function sendPostFromUser(senderId, receivingLoopIds, 
      receivingUserIds, postContent){
    const createPostInput = {
      senderId,
      receivingLoopIds,
      receivingUserIds,
      postType: 'text',
      postContent
    }
    return await client.post("/users/" + senderId + "/create_post", createPostInput);
  }

  async function showPostsSharedToUser(userId){
  return await client.get("/users/" + userId + "/posts",);
  }

  async function registerAndCreateUser(userInput){   
    const response = await myFirebase.auth().createUserWithEmailAndPassword(userInput['email'], userInput['password']);
    const createUserResponse = await createUserApi(response.user.uid, userInput['userId'],userInput['firstName'], userInput['lastName'], userInput['email']);
    return createUserResponse.data;
  }

  async function sendAuthenticatedRequest(myUserInput, route, postBodyParams){
    const idToken = await getLoggedInUserToken(myUserInput.email, myUserInput.password);
    postBodyParams['idToken'] = idToken;
    return await client.post(route, postBodyParams);
  }

  async function sendUnAuthenticatedRequest(route, postBodyParams){
    return client.post(route, postBodyParams);
  }

  async function getLoggedInUserToken(email,password){
    return await myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          return firebase.auth()
                .currentUser
                .getIdToken();
        });
  }

  function resultToLoop(result){
    return {id: result.data.loopId};
  }

  describe('authenticated state', async () => {
    describe('Managing friends and loops', async () => {

      

      // it('Create a user', async () => {
      //   const userInput = getRandomCreateUserInput();
      //   const resp = await registerAndCreateUser(userInput);
      //   assert.strictEqual(resp['firstName'],userInput['firstName']);
      //   assert.strictEqual(resp['lastName'],userInput['lastName']);
      //   assert.strictEqual(resp['email'],userInput['email']);
      // });

      // it('Add a user as a friend ', async () => {
      //   const myUserInput = getRandomCreateUserInput();
      //   resultToUser(await registerAndCreateUser(myUserInput));
      //   const myUsersFriendInput = getRandomCreateUserInput();
      //   const myUsersFriend = resultToUser(await registerAndCreateUser(myUsersFriendInput));
      //   const resp = await addAsFriend(myUserInput, myUsersFriend.id);
      // //TODO: fetch users friends and assert users friend is present in the list
      //   assert.strictEqual(resp.status, 200);
      // });

      it('Create a loop ', async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(await registerAndCreateUser(myUsersFriendInput));
        await addAsFriend(myUserInput, myUsersFriend.id);
        const loopName = randomString(6);
        const createLoopResponseData = await createLoop(myUserInput,loopName, [myUsersFriend.id]);
        assert.strictEqual(createLoopResponseData['loopName'], loopName);
      }).timeout(10000);

    //   it('Create a loop with a duplicate name', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const loop = resultToLoop(await createLoop(myUser.id));
    //     const duplicateLoopReqResponse = await createLoop(myUser.id, loop.name);
    //     assert.strictEqual(duplicateLoopReqResponse.status, 400); 
    //   });
      
    //   it("Update a loop's name to a duplicate name (not allowed)", async () => {
    //     const myUser = resultToUser(await createUser());
    //     const loop1 = createLoop(myUser.id);
    //     const loop2 = createLoop(myUser.id);
    //     const updateNameReqResponse = 
    //       await updateLoopName(loop2.id, loop1.name);
    //     assert.strictEqual(updateNameReqResponse.status, 400);
    //   });

    //   it('Add a friend to a loop ', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const myUsersFriend = resultToUser(await createUser());
    //     await addAsFriend(myUser.id, myUsersFriend.id);
    //     const loop = resultToLoop(await createLoop(myUser.id));
    //     const addFriendToLoopReqResponse 
    //       = await addFriendToLoop(loop.id,  myUsersFriend.id);
    //     //TODO: fetch loop and test if friend is present in loop
    //     assert.strictEqual(addFriendToLoopReqResponse.status, 200);
    //   });

    //   it('Remove a friend from a loop ', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const myUsersFriend = resultToUser(await createUser());
    //     await addAsFriend(myUser.id, myUsersFriend.id);
    //     const loop = resultToLoop(await createLoop(myUser.id));
    //     await addFriendToLoop(loop,  myUsersFriend.id);
    //   //TODO: fetch loop and test if friend is present in loop
    //     const result = await removeFriendFromLoop(loop.id, myUsersFriend.id);
    //    //TODO: fetch loop and test if friend is removed from loop
    //     assert.strictEqual(result.status, 200);
    //   });
    // });

    // describe('Private messages', async () => {
    //   it('Send a message to a user ', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const myUsersFriend = resultToUser(await createUser());
    //     await addAsFriend(myUser.id, myUsersFriend.id);
    //     const message = "Hello";
    //     const result = await sendMessage(myUser.id, myUsersFriend.id, message);
    //   //TODO: fetch users messages and test message is present
    //     assert.strictEqual(result.status, 200);
    //   });
    //   it('Recieve messages from other users ', async () => {}); //TBD
    //   it('Read chat history with a user ', async () => {}); //TBD
    // });

    // describe('Post sharing', async () => {
    //   it('Create a post and share with a list of loops', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const myUsersFriend = resultToUser(await createUser());
    //     await addAsFriend(myUser.id, myUsersFriend.id);
    //     const loop1 = resultToLoop(await createLoop(myUser.id));
    //     const loop2 = resultToLoop(await createLoop(myUser.id));
    //     const allowedLoops = [loop1.id, loop2.id];
    //     const allowedUsers = [myUsersFriend.id];
    //     const myUsersPostContent = "Hello all";
    //     const result = await 
    //     sendPostFromUser(
    //       myUser.id, 
    //       allowedLoops, 
    //       allowedUsers, 
    //       myUsersPostContent);
    //     assert.strictEqual(result.status, 200);
    //   });

    //   it('Incorrect loop names in above request (not allowed)', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const myUsersFriend = resultToUser(await createUser());
    //     await addAsFriend(myUser.id, myUsersFriend.id);
    //     const loop1 = resultToLoop(await createLoop(myUser.id));
    //     const allowedLoops = [loop1.id, '123'];
    //     const allowedUsers = [myUsersFriend.id];
    //     const myUsersPostContent = "Hello all";
    //     const result = await 
    //     sendPostFromUser(
    //       myUser.id, 
    //       allowedLoops, 
    //       allowedUsers, 
    //       myUsersPostContent);
    //     assert.strictEqual(result.status, 400);
    //   });

    //   // it('User views their own posts ', async () => {}); //TBD
    //   it('User deletes their post', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const myUsersFriend = resultToUser(await createUser());
    //     await addAsFriend(myUser.id, myUsersFriend.id);
    //     const allowedLoops = [];
    //     const allowedUsers = [myUsersFriend.id];
    //     const myUsersPostContent = "Hello all";
    //     const result = await sendPostFromUser(
    //       myUser.id, 
    //       allowedLoops, 
    //       allowedUsers, 
    //       myUsersPostContent);
    //     const postId = result.data._id;
    //     console.log(postId);
    //     const deleteReq = await client.delete("/posts/" + postId + "/delete");
    //     assert.strictEqual(deleteReq.status, 200);
    //   });
    // });


    // describe('Feed', async () => {
    //   it('User reads all posts shared to user', async () => {
    //     const myUser = resultToUser(await createUser());
    //     const myUsersFriend = resultToUser(await createUser());
    //     await addAsFriend(myUser.id, myUsersFriend.id);
    //     const allowedLoops = [];
    //     const allowedUsers = [myUsersFriend.id];
    //     const myUsersPostContent = "Hello all";
    //     await sendPostFromUser(
    //       myUser.id, 
    //       allowedLoops, 
    //       allowedUsers, 
    //       myUsersPostContent);
    //     const result = await showPostsSharedToUser(myUser.id);
    //     assert.strictEqual(result.status, 200);
    //   }); 
    //   it('User replies to a post shared to them', async () => {}); //TBD
    // });
    });
  });

});
