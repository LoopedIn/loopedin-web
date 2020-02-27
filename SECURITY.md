## Security Analysis

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
