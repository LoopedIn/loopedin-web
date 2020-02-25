/* eslint-disable prettier/prettier */
// Import the dependencies for testing
// const assert = require('assert');
// const axios = require('axios').default;
// const axiosCookieJarSupport = require('axios-cookiejar-support').default;
// const tough = require('tough-cookie');

// const app = require('../app');

// axiosCookieJarSupport(axios);ff

// const PORT = 3000;

describe('application', async () => {
    // // /* fill these in before each test */
    // // let server = {};
    // // let client = {};
  
    // // const serverNumber = /The server's favorite number is currently (\d+)\./;
    // // const userNumber = /Your favorite number is currently (\d+)\./;
  
    // // axios.defaults.withCredentials = true;
    // // axios.defaults.baseURL = `http://localhost:${PORT}/`;
    // // axios.defaults.validateStatus = () => true;
  
    // /* Utility functions
    //  */
    // // Deterministic (for testing) Math.random replacement
    // // https://gist.github.com/mathiasbynens/5670917
  
    // const psrand = (() => {
    //   let seed = 0xaabbccd;
    //   return () => {
    //     /* eslint-disable no-bitwise */
    //     // Robert Jenkins’ 32 bit integer hash function
    //     seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
    //     seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
    //     seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
    //     seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
    //     seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
    //     seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
    //     return (seed & 0xfffffff) / 0x10000000;
    //     /* eslint-enable no-bitwise */
    //   };
    // })();
  
    // // https://gist.github.com/6174/6062387#gistcomment-2915959
    // function getRandomString(length) {
    //   let s = '';
    //   do {
    //     s += psrand()
    //       .toString(36)
    //       .substr(2);
    //   } while (s.length < length);
    //   s = s.substr(0, length);
    //   return s;
    // }
  
    // async function createRandomUser(axiosClient) {
    //   const newUser = {
    //     username: getRandomString(10),
    //     password: getRandomString(10),
    //     number: Math.floor(psrand() * 100),
    //   };
    //   const response = await axiosClient.post('/register', newUser);
    //   return { newUser, response };
    // }
  
    // beforeEach(async () => {
    //   client = axios.create();
    //   // make a new cookie jar every time you create a new client
    //   client.defaults.jar = new tough.CookieJar();
  
    //   server = app.listen(PORT);
    // });
  
    // afterEach(async () => {
    //   await server.close();
    // });
  
    describe('sanity', async () => {
      it('can successfully send an index', async () => {
      });
  
      it("doesn't send files that don't exist", async () => {
      });
  
      it('sends the raw index.html', async () => {
      });
    });
  
    describe('unauthenticated state', async () => {
      describe('registration', async () => {
  
        describe('user attempts to register with invalid credentials', async () => {
          it('duplicate user name (not allowed)');
          it('incorrect user name (not allowed)');
          it('weak password (not allowed)');
        });
  
        it('user registers with sufficient information ');
      });
  
      describe('login', async () => {
        it('user attempts to login with incorrect password (not allowed)');
        it('user logs in with correct password');
      });
    });
  
    describe('authenticated state', async () => {    
      describe('Managing friends and loops', async () => {
        it('Add a user who is missing (not allowed)');
        it('Add a user as a friend ');
        it('Create a loop ');
        it('Create a loop with a duplicate name (not allowed)');
        it('Update a loop\'s name to a duplicate name (not allowed)');
        it('Add a friend to a loop ');
        it('Remove a friend from a loop ');
      });
  
      describe('Private messages', async() => {
        it('Send a message to a user ');
        it('Recieve messages from other users ');
        it('Read chat history with a user ');
      });
  
      describe('Post sharing', async() => {
        it(' Create a post and share with a list of loops'); 
        it('Incorrect loop names in above request (not allowed)');
        it('User views their own posts ');
        it('User deletes their post');
      });
      
      describe('Feed', async() => {
        it('User reads all posts shared to them');
        it('User replies to a post shared to them');
      });
    });
  });
  