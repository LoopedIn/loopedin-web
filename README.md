
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
| **Shiva** | worked as a backend developer for 3 year | **DevOps** I want to implement a CI/CD pipeline for smooth deployment using Docker and Kubernetes|
| **Suhan** | Worked as a Front End Developer for 2 years | **FrontEnd** I would like to learn a new JS framework like React and explore styling frameworks Bootstrap/Material UI |
| **Arvind** | Performed Full-Stack web development for 1.8 years | **Cloud**: I would like to explore migrating an application to google cloud and check the performance difference
| **Krunal**| Web Programming Intermediate | **Database** |

## Terminology:-

-   **Loop:-**  A group (sort of like a mailing list) but visible only to the creator
-   **Post:-** A message shared from user to a Loop (only text for now, media sharing will be explored)
-   **Message:-** From user to user (traditional message)

## Deliverables for checkpoint 2


The deliverables for checkpoint 2 will support a few functionalities via API and a few basic functionalities via UI.

**Functionalities supported via API only:-**
1.  Register user
2.  Login user
3.  Create/Read and Update a loop
4.  Send a message from one user to another
5.  Create a post
6.  Read posts shared to user
7.  Delete a post shared by the user.  
      
**Functionalities  supported via UI:-**
1.  Register user
2.  Login user

## Deliverables for checkpoint 4

By this checkpoint we will add UI functionalities for the API end points we created for checkpoint 2, and a few more features.

**New functionalities that will be supported via UI:-**
 - Create/Read and Update a loop
 - Create a post
 - Send a message from one user to another (no socket/notification)
 - Delete a post shared by the user.
 - Messages accept plain text, with urls automatically converted into links (No other HTML is accepted in messages).
 - Show unread messages

**Other deliverables:-**
 - Adding required test cases 
 - Boilerplate for migrating app to use cloud resources


## Deliverables for final project

**New functionalities that will be supported via UI:-**
-   View news feed
-   Reply to a post in the news feed
-   Chat will use socket for instant messaging
-   Deploying apps using DevOps and Testing
-   Using Cloud-Native Functions
    

## Specialization deliverables

 1. **Cloud**: Adding GCP libraries to app, Documentation of steps to structuring app to communicate with cloud
   environment. We will use mongoDB atlas integrated with GCP.
 2. **DevOps**: We will implement a CI/CD pipeline for smooth deployment using Docker and Kubernetes.
 3. **FrontEnd**: We will use a JS framework like React and explore styling frameworks Bootstrap/Material UI.
   
## Security analysis

1 - **Injection** : Our app uses MongoDB and can be vulnerable to NoSQLi attacks To prevent NoSQLi attacks we will perform server side validation on the inputs from GET and POST requests. [https://www.owasp.org/images/e/ed/GOD16-NOSQL.pdf](https://www.owasp.org/images/e/ed/GOD16-NOSQL.pdf)  [https://www.objectrocket.com/blog/mongodb/code-injection-in-mongodb/](https://www.objectrocket.com/blog/mongodb/code-injection-in-mongodb/)

2 - **Broken authentication** : Our apps user accounts can be compromised by breaking authentication. Implementing weak password checks to eliminate the possibility of commonly used passwords preventing common password hacks. Implement a server side built in session manager to handle the creation of session ids with high entropy. We will deploy the app without any default credentials. We will explore limiting the number of incorrect login attempts.

3- **Sensitive data exposure** : We need to prevent pages containing user info to be accessible by others. Disable caching for responses that contain sensitive data. We will store passwords using hashing functions.

4- **External Entities (XXE)** : We are not vulnerable to XXE attacks as we do not use any XML parsers in our app. To prevent XXE attacks we will use only JSON data formats.

5 - **Broken access control** : We need to implement strong access control in order to prevent the access of one users messages by another. We will implement access control to provide edit/delete access of messages only to the creator of the message. We will log access control failures.

6 - **Security misconfiguration** : We need to ensure that the server is configured correctly. We will use a fixed deployment process that is configured identically but with different credentials for testing and prod. We need to ensure that detailed error messages containing server information are not shown to the user. eg : stack traces

7 - **Cross-Site scripting (XSS)** : We are using ReactJS which avoids some common XSS attacks by automatically escaping strings. We will try to analyze the app to see if other forms of XSS are possible. [https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected](https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected)

8 - **Insecure Deserialization** : Do not trust user input that comes in the form of serialized object. We will perform validation on the data. We are not sending any data between systems in this app. [https://blog.detectify.com/2018/03/21/owasp-top-10-insecure-deserialization/](https://blog.detectify.com/2018/03/21/owasp-top-10-insecure-deserialization/)

9 - **Components with known vulnerabilities** : We will remove any unused dependencies, files and features. We will ensure that dependencies are up-to-date and from official sources.

10 - **Insufficient Logging & Monitoring** : We will ensure proper logging of all crucial information such as logins, messages and updates to messages. We will implement different log levels to allow effective monitoring of validation failures and failed logins.

List of threats from [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)

# Installation

We will fill this section in the future.
