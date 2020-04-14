
# Cookie-crumbs Final Project

# LoopedIn

## Description

The project is a lightweight social network that attempts to solve some of the problems with existing social network platforms by cutting down on features that make existing social networks unhealthy. LoopedIn remodels the UX behind sharing a post or information to make it easier for users to retain their privacy. Each post has to be tied to who they want to share it with (kind of like Google+ and circles).

We also force the engagement with a post to be personal and organic. This means removing the idea of a ‘like’ button, and making a comment to a post as a personal message.

To keep our target app realistic, the features we will provide our:-
-   Post sharing
-   Private messaging

## We will support:

-   User registration
-   User authentication
-   After a user logs in:-
    -   User can send a message to another user (using an id)
    -   User can view historical chat with another user
    -   User can view all posts shared to them by other users (newsfeed equivalent).
    -   User can respond to a post they see on the news feed. Response is taken to private chat. (Like whatsapp).
    -   User can create a loop of friends.
    -   User can edit/delete a loop.
    -   User can make a post and choose the loops they want to share the post with.
    -   User can view their own posts.
    -   User can edit/delete their own post.

## Authors


| Member | Web dev level | Specialization |
| --- | --- | --- |
| **Shiva** | worked as a backend developer for 3 year | **DevOps** I want to implement a CI/CD pipeline for smooth deployment using Docker and Kubernetes |
| **Suhan** | Worked as a Front End Developer for 2 years | **FrontEnd** I would like to learn a new JS framework like React and explore styling frameworks Bootstrap/Material UI |
| **Arvind** | Performed Full-Stack web development for 1.8 years | **Cloud**: I would like to explore migrating an application to google cloud and check the performance difference |
| **Krunal**| Web Programming Intermediate | **Security** I would like to learn about how to improve the security of the application |

## Terminology:-

-   **Loop:-**  A group (sort of like a mailing list) but visible only to the creator
-   **Post:-** A message shared from user to a Loop (only text for now, media sharing will be explored)
-   **Message:-** From user to user (traditional message)

## Deliverables for checkpoint 2


The deliverables for checkpoint 2 will support a few functionalities via API and a few basic functionalities via UI.

**Functionalities supported via API only:-**

- [x]  Create/Read and Update a loop
- [x]  Send a message from one user to another
- [x]  Create a post
- [x]  Read posts shared to user
- [x]  Delete a post shared by the user.  
      
**Functionalities  supported via UI:-**
- [x]  Register user
- [x]  Login user

## Deliverables for checkpoint 4

By this checkpoint we will add UI functionalities for the API end points we created for checkpoint 2, and a few more features.

**Since all of the API functionality and associated tests are finished in checkpoint 3, we will only be adding tests to validate input strings in the next checkpoint. If we run into bugs/corner cases as part our UI devlopment, we will consider corresponding regression tests additionally**

**New functionalities that will be supported via UI:-**
 - [x] Create/Read and Update a loop
 - [x] Create a post
 - [x] Send a message from one user to another (no socket/notification)
 - [x] Delete a post shared by the user.
 - [x] Messages accept plain text, with urls automatically converted into links (No other HTML is accepted in messages).
 - [x] Manage user's friends and loops


## Deliverables for final project

**New functionalities that will be supported via UI:-**
-   [x] View news feed
-   [ ] Reply to a post in the news feed
-   [ ] Chat will use socket for instant messaging
-   [ ] Deploying apps via GCP
-   [X] ~~Using Cloud-Native Functions~~ (We are using google firebase for authentication, don't forsee any features that will require cloud native functions)
    

## Specialization deliverables

 1. **Cloud**: Adding GCP libraries to app, Documentation of steps to structuring app to communicate with cloud
   environment. We will use mongoDB atlas integrated with GCP.
 2. **DevOps**: We will implement a CI/CD pipeline for smooth deployment using Docker and Kubernetes.
 3. **FrontEnd**: We will use a JS framework like React and explore styling frameworks Bootstrap/Material UI.
 4. **Security**: We will implement security features mentioned in the Security analysis. Additionally, we will implement role-management, strong password security, configuring IAM roles in GCP, keeping secrets in secret store using GitHub actions.

#  Installation
  
**Prerequisites**:
1. Docker
2. Firebase account

**Setting up firebase credentials:**

We use firebase to authenticate our users and as a store for user credentials, you will need to create your own firebase account to create an independent build.

You will need to update 2 keys to link your firebase app to this project :-

1. **The public key**
	 Replace the firebaseConfig json in the file  ```client/src/firebase.js```
	
3. **The private key**
	Create a private key for your firebase app and add it in the file ```server/config/serviceAccountKey.json``` . *Do not check in this file into your branch.*
	
See [this](https://github.com/ckanich-classrooms/final-project-cookie-crumbs-1/blob/checkpoint_3/Screen%20Shot%202020-03-30%20at%204.17.22%20PM.png) for reference.


**Running the app**:

After setting up the firebase credentials, and installing docker.
```bash
docker-compose build
docker-compose up
```

# References
- https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side
- https://itnext.io/firebase-login-functionality-from-scratch-with-react-redux-2bf316e5820f
- https://github.com/bradtraversy/devconnector_2.0
- https://www.youtube.com/watch?v=xm4LX5fJKZ8&list=PLcCp4mjO-z98WAu4sd0eVha1g-NMfzHZk


