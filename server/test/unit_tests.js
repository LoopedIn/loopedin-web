const assert = require('assert');
const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

const { mongoose, serverListener } = require('../lib/server');

const PORT = 3000;

const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyA7IYES3jUgEZdYtUYIjQydZQBrFDAVFFE",
  authDomain: "looped-in-274723.firebaseapp.com",
  databaseURL: "https://looped-in-274723.firebaseio.com",
  projectId: "looped-in-274723",
  storageBucket: "looped-in-274723.appspot.com",
  messagingSenderId: "390540936470",
  appId: "1:390540936470:web:300e311ca95c657c907c37",
  measurementId: "G-8RZ5GK2XFL"
};

const myFirebase = firebase.initializeApp(firebaseConfig);
myFirebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

describe('application', async () => {
  let client = {};
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `http://localhost:${PORT}/api`;
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
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function getRandomCreateUserInput() {
    const random = randomString(5);
    return {
      userId: random,
      email: `${random}@email.com`,
      firstName: `${random}_fn`,
      lastName: `${random}_ln`,
      password: `${random}_pass`,
    };
  }

  async function createLoop(myUserInput, loopName, receivingUsers) {
    // console.log(receivingUsers);
    const random = randomString(5);
    if (loopName === undefined) {
      loopName = random;
    }
    const createLoopInput = {
      loopName,
      receivingUsers,
    };
    const response = await sendAuthenticatedRequest(
      myUserInput,
      '/users/create_loop',
      createLoopInput,
    );
    // console.log(`RESPONSE IS ${JSON.stringify(response.data)}`);
    return response.data;
  }

  async function createMessage(myUserInput, receivingUsers) {
    const createMessageInput = {
      receivingUserId: receivingUsers,
      messageType: 'text',
      messageContent: randomString(10),
    };

    const response = await sendAuthenticatedRequest(
      myUserInput,
      '/users/create_message',
      createMessageInput,
    );
    return response.data;
  }
  async function createUnfilteredMessage(myUserInput, receivingUsers) {
    const createMessageInput = {
      receivingUserId: receivingUsers,
      messageType: 'text',
      messageContent: '<script>Hello</script>',
    };

    const response = await sendAuthenticatedRequest(
      myUserInput,
      '/users/create_message',
      createMessageInput,
    );
    return response.data;
  }
  async function createPosts(myUserInput, receivingUsers, receivingLoopIds) {
    // console.log(myUserInput);
    // console.log(receivingUsers);

    const createPostInput = {
      receivingUserIds: [receivingUsers],
      receivingLoopIds: [receivingLoopIds],
      postType: 'text',
      postContent: randomString(10),
    };
    //console.log(createPostInput);
    const response = await sendAuthenticatedRequest(
      myUserInput,
      '/users/create_post',
      createPostInput,
    );
    //console.log(response.data)
    return response.data;
  }
  async function createUnfilteredPost(
    myUserInput,
    receivingUsers,
    receivingLoopIds,
  ) {
    const createPostInput = {
      receivingUserIds: [receivingUsers],
      receivingLoopIds: [receivingLoopIds],
      postType: 'text',
      postContent: '<script>Hello</script>',
    };
    //console.log(createPostInput);
    const response = await sendAuthenticatedRequest(
      myUserInput,
      '/users/create_post',
      createPostInput,
    );
    //console.log(response.data)
    return response.data;
  }
  async function getPosts(receivingUser) {
    const getPostInput = {};
    const response = await sendAuthenticatedRequest(
      receivingUser,
      '/posts/get_recent_posts',
      getPostInput,
    );
    return response.data;
  }

  async function getRecentChats(receivingUser) {
    const getMessageInput = {};
    const response = await sendAuthenticatedRequest(
      receivingUser,
      '/users/get_recent_chats',
      getMessageInput,
    );
    return response.data;
  }
  async function getFriendChats(myUserInput, receivingUserId) {
    const getMessageInput = {
      friendID: receivingUserId,
    };
    const response = await sendAuthenticatedRequest(
      myUserInput,
      '/users/get_chat_history',
      getMessageInput,
    );
    return response.data;
  }

  async function updateLoopName(myUserInput, loop_id, newLoopName) {
    const updateLoopInput = {
      loop: {
        loop_id,
        loopName: newLoopName,
        contacts: [],
      },
    };

    return await sendAuthenticatedRequest(
      myUserInput,
      `/loops/${loop_id}/update_loop`,
      updateLoopInput,
    );
  }

  async function createUserApi(token, userName, firstName, lastName, email) {
    const input = {
      authToken: token,
      userName,
      firstName,
      lastName,
      email,
    };
    return sendUnAuthenticatedRequest('/users/create', input);
  }

  async function addAsFriend(myUserInput, user2name) {
    const addFriendInput = {
      friendIds: [user2name],
      listOfLoops: [],
    };
    const response = await sendAuthenticatedRequest(
      myUserInput,
      '/users/add_friend',
      addFriendInput,
    );
    return response;
  }

  async function addFriendToLoop(myUserInput, loop, friendId) {
    const updateLoopInput = {
      loop: {
        loop_id: loop._id,
        contacts: [friendId],
        loopName: loop.loopName,
      },
    };
    return await sendAuthenticatedRequest(
      myUserInput,
      `/loops/${loop._id}/update_loop`,
      updateLoopInput,
    );
  }

  function resultToUser(result) {
    return { id: result._id };
  }

  async function registerAndCreateUser(userInput) {
    var loginError;
    const response = await myFirebase
      .auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .catch((error) => {
        loginError = error;
      });
    if (loginError) {
      return loginError;
    }
    const createUserResponse = await createUserApi(
      response.user.uid,
      userInput.userId,
      userInput.firstName,
      userInput.lastName,
      userInput.email,
    );
    return createUserResponse.data;
  }

  async function sendAuthenticatedRequest(myUserInput, route, postBodyParams) {
    const idToken = await getLoggedInUserToken(
      myUserInput.email,
      myUserInput.password,
    );
    postBodyParams.idToken = idToken; // TODO : Null check here
    return await client.post(route, postBodyParams);
  }

  async function sendUnAuthenticatedRequest(route, postBodyParams) {
    return client.post(route, postBodyParams);
  }

  async function getLoggedInUserToken(email, password) {
    return await myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser.getIdToken();
      });
  }

  describe('authenticated state', async () => {
    describe('Managing friends and loops', async () => {
      it('Create a user', async () => {
        const userInput = getRandomCreateUserInput();
        const resp = await registerAndCreateUser(userInput);
        assert.strictEqual(resp.firstName, userInput.firstName);
        assert.strictEqual(resp.lastName, userInput.lastName);
        assert.strictEqual(resp.email, userInput.email);
      }).timeout(10000);

      it('Add a user as a friend ', async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        resultToUser(
          await registerAndCreateUser(myUsersFriendInput),
        );
        const resp = await addAsFriend(myUserInput, myUsersFriendInput.userId);

        assert.strictEqual(resp.status, 200);
        // fetch users friends and assert users friend is present in the list
        const response = await sendAuthenticatedRequest(
          myUserInput,
          '/users/getcontacts',
          {},
        );

        assert.strictEqual(response.status, 200);
        const friends = response.data[0].friendIds;
        let isFound = false;
        for (let i = 0; i < friends.length; i++) {
          const element = friends[i].userName;
          if (element === myUsersFriendInput.userId) {
            isFound = true;
            break;
          }
        }
        assert.strictEqual(isFound, true);
      }).timeout(10000);

      it('Create a loop ', async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(
          await registerAndCreateUser(myUsersFriendInput),
        );
        await addAsFriend(myUserInput, myUsersFriend.id);
        const loopName = randomString(6);
        const createLoopResponseData = await createLoop(myUserInput, loopName, [
          myUsersFriend.id,
        ]);
        assert.strictEqual(createLoopResponseData.loopName, loopName);
      }).timeout(10000);

      it('Create a message ', async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(
          await registerAndCreateUser(myUsersFriendInput),
        );
        const message = await createMessage(myUserInput, myUsersFriend.id);
        //console.log(message);
        // TODO: fetch users friend and assert
        // users friend is present in the list
        assert.strictEqual(message.receivingUserId, myUsersFriend.id);
      }).timeout(10000);

      it('Create a post ', async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(
          await registerAndCreateUser(myUsersFriendInput),
        );
        await addAsFriend(myUserInput, myUsersFriend.id);
        const createLoopResponseData = await createLoop(
          myUserInput,
          undefined,
          myUsersFriend.id,
        );

        const createPostResponseData = await createPosts(
          myUserInput,
          myUsersFriend.id,
          createLoopResponseData._id,
        );
        // console.log(createPostResponseData);
        assert.equal(
          createPostResponseData.receivingUserIds[0],
          myUsersFriend.id,
        );
        assert.equal(
          createPostResponseData.receivingLoopIds[0],
          createLoopResponseData._id,
        );
      }).timeout(10000);

      it('Get this users timeline', async () => {
        const myUserInput = getRandomCreateUserInput();

        resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(
          await registerAndCreateUser(myUsersFriendInput),
        );
        await addAsFriend(myUserInput, myUsersFriend.id);
        const createLoopResponseData = await createLoop(
          myUserInput,
          undefined,
          myUsersFriend.id,
        );
        await createPosts(myUserInput, undefined, createLoopResponseData._id);
        await createPosts(myUserInput, undefined, createLoopResponseData._id);
        const getPostsResponse = await getPosts(myUsersFriendInput);

        assert.equal(getPostsResponse.posts.length, 2);
      }).timeout(10000);

      it('Get this users messages ', async () => {
        const myUserInput = getRandomCreateUserInput();
        const myUser = resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(
          await registerAndCreateUser(myUsersFriendInput),
        );

        const myUsersFriendInput2 = getRandomCreateUserInput();
        resultToUser(
          await registerAndCreateUser(myUsersFriendInput2),
        );

        await addAsFriend(myUserInput, myUsersFriendInput.userId);
        await addAsFriend(myUserInput, myUsersFriendInput2.userId);

        const message1 = await createMessage(myUserInput, myUsersFriend.id);
        const message2 = await createMessage(myUsersFriendInput, myUser.id);
        const message3 = await createMessage(myUserInput, myUsersFriend.id);

        //await createMessage(myUserInput, myUsersFriend2.id);
        //await createMessage(myUsersFriendInput2, myUser.id);

        await getRecentChats(myUserInput);

        //console.log("message",getMessages);
        assert(message1.messageContent);
        assert(message2.messageContent);
        assert(message3.messageContent);
      }).timeout(10000);

      it('Get this users messages with friend', async () => {
        const myUserInput = getRandomCreateUserInput();
        const myUser = resultToUser(await registerAndCreateUser(myUserInput));
        const myUsersFriendInput = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(
          await registerAndCreateUser(myUsersFriendInput),
        );
        const message1 = await createMessage(myUserInput, myUsersFriend.id);
        const message2 = await createMessage(myUsersFriendInput, myUser.id);
        const message3 = await createMessage(myUserInput, myUsersFriend.id);
        await getFriendChats(myUserInput, myUsersFriend.id);

        // console.log(getMessages);
        assert(message1.messageContent);
        assert(message2.messageContent);
        assert(message3.messageContent);
      }).timeout(10000);

      it('Create a loop with a duplicate name', async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        // console.log(`_ID ${id}`);
        const loop = await createLoop(myUserInput, undefined, []);
        // // console.log("CREATED loop "+JSON.stringify(loop))
        const duplicateLoopReqResponse = await createLoop(
          myUserInput,
          loop.loopName,
          [],
        );
        // console.log(
        //   `MONGO ERROR ${JSON.stringify(duplicateLoopReqResponse)}`
        //   );
        assert.strictEqual(duplicateLoopReqResponse.name, 'MongoError');
      }).timeout(10000);

      it("Update a loop's name to a duplicate name (not allowed)", async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        const loop1 = await createLoop(myUserInput, undefined, []);
        const loop2 = await createLoop(myUserInput, undefined, []);
        // console.log(`loop is ${JSON.stringify(loop2)}`);
        // console.log(`loop2 is ${JSON.stringify(loop1)}`);
        const updateNameReqResponse = await updateLoopName(
          myUserInput,
          loop2._id,
          loop1.loopName,
        );
        // console.log("ERROR"+ (updateNameReqResponse));
        assert.strictEqual(updateNameReqResponse.status, 400);
      }).timeout(10000);

      it('Add a friend to a loop ', async () => {
        const myUserInput = getRandomCreateUserInput();
        resultToUser(await registerAndCreateUser(myUserInput));
        const user2 = getRandomCreateUserInput();
        const myUsersFriend = resultToUser(await registerAndCreateUser(user2));

        await addAsFriend(myUserInput, myUsersFriend.id);
        const loop = await createLoop(myUserInput, undefined, [
          myUsersFriend.id,
        ]);

        const addFriendToLoopReqResponse = await addFriendToLoop(
          myUserInput,
          loop,
          myUsersFriend.id,
        );
        // fetch loop and test if friend is present in loop

        assert.strictEqual(addFriendToLoopReqResponse.status, 200);
        const resp = await sendAuthenticatedRequest(
          myUserInput,
          `/loops/${loop._id}/get_contacts`,
          {},
        );
        assert.strictEqual(resp.status, 200);
        // // console.log(resp)
        if (resp.status === 200) {
          const contacts = resp.data[0].receivingUsers;
          // // console.log("Receiving users "+Object.keys())
          let isFound = false;
          for (let i = 0; i < contacts.length; i++) {
            const element = contacts[i];
            // console.log(element);
            if (element === myUsersFriend.id) {
              isFound = true;
              break;
            }
          }
          assert.strictEqual(isFound, true);
        }
      }).timeout(10000);
    });
  });
  describe('Input validation tests', async () => {
    it('Email-id given by user is in a valid email address format.', async () => {
      const userInput = getRandomCreateUserInput();
      userInput.email = 'notValidEmail';
      const resp = await registerAndCreateUser(userInput);
      //console.log(resp.message);
      assert.strictEqual(resp.message, 'The email address is badly formatted.');
    }).timeout(10000);
    it('Username input for adding a new friend is an invalid username', async () => {
      const myUserInput = getRandomCreateUserInput();
      resultToUser(await registerAndCreateUser(myUserInput));
      const myUsersFriendInput = getRandomCreateUserInput();
      const resp = await addAsFriend(myUserInput, myUsersFriendInput.userId);
      assert.strictEqual(resp.status, 400);
      assert.strictEqual(resp.data, 'User does not exist');
    }).timeout(10000);
    it('Post body contains unfiltered text', async () => {
      const myUserInput = getRandomCreateUserInput();
      resultToUser(await registerAndCreateUser(myUserInput));
      const myUsersFriendInput = getRandomCreateUserInput();
      const myUsersFriend = resultToUser(
        await registerAndCreateUser(myUsersFriendInput),
      );
      await addAsFriend(myUserInput, myUsersFriend.id);
      const createLoopResponseData = await createLoop(
        myUserInput,
        undefined,
        myUsersFriend.id,
      );
      const createPostResponseData = await createUnfilteredPost(
        myUserInput,
        myUsersFriend.id,
        createLoopResponseData._id,
      );
      //console.log(createPostResponseData);
      assert.notEqual(createPostResponseData.postContent, '<script>');
    }).timeout(10000);
    it('Message body contains unfiltered text', async () => {
      const myUserInput = getRandomCreateUserInput();
      resultToUser(await registerAndCreateUser(myUserInput));
      const myUsersFriendInput = getRandomCreateUserInput();
      const myUsersFriend = resultToUser(
        await registerAndCreateUser(myUsersFriendInput),
      );
      const message = await createUnfilteredMessage(
        myUserInput,
        myUsersFriend.id,
      );
      assert.notEqual(message.messageContent, '<script>');
    }).timeout(10000);
  });
});
