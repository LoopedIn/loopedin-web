var axios = require("axios");
const assert = require('assert');

const PORT = 3000;
const client = axios.create({
  withCredentials: true,
  baseURL: `http://localhost:${PORT}/`,
  validateStatus: function(status) {
    /* always resolve on any HTTP status */
    return true;
  }
});



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters
       .charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 console.log(makeid(5));

describe('application', async () => {
  describe('sanity', async () => {
    it("Tests mongodb connection", async () => {
      const val = makeid(5);
      const input = {
        "testVal":  val
      };
      const output = await client.post('/test', input);
      assert(output.data.testVal === val);
    });
    it('can successfully send an index', async () => {});

    it("doesn't send files that don't exist", async () => {});

    it('sends the raw index.html', async () => {});
  });



  // describe('authenticated state', async () => {
  //   describe('Managing friends and loops', async () => {
  //     it('Add a user who is missing (not allowed)', async () => {});
  //     it('Add a user as a friend ', async () => {});
  //     it('Create a loop ', async () => {});
  //     it('Create a loop with a duplicate name (not allowed)', async () => {});
  //     it("Update a loop's name to a duplicate name (not allowed)", async () => {});
  //     it('Add a friend to a loop ', async () => {});
  //     it('Remove a friend from a loop ', async () => {});
  //   });

  //   describe('Private messages', async () => {
  //     it('Send a message to a user ', async () => {});
  //     it('Recieve messages from other users ', async () => {});
  //     it('Read chat history with a user ', async () => {});
  //   });

  //   describe('Post sharing', async () => {
  //     // it(' Create a post and share with a list of loops', async () => {
  //     //   return client.post("/create-post", { postId: "testpost",
  //     //   senderId: "sender",
  //     //   receivingUserIds: "receiver" ,
  //     //   receivingLoopIds: "loop",
  //     //   postType: "image",
  //     //   postContent:"helloworld"});

  //     // });
  //     it('Incorrect loop names in above request (not allowed)', async () => {});
  //     it('User views their own posts ', async () => {});
  //     it('User deletes their post', async () => {});
  //   });

  //   describe('Feed', async () => {
  //     it('User reads all posts shared to them', async () => {});
  //     it('User replies to a post shared to them', async () => {});
  //   });
  // });
});
