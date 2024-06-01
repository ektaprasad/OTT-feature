Instructions for setting up and running your application and tests.

Initial Setup
1.Install MongoDB on your device, reference from 
https://www.mongodb.com/docs/manual/installation/
2. Use 18.18.2 version of node
3. start mongo server as per instructions in above link.
4. Import the attached postman collection to run apis.

To run the project
1. npm install
2. npm run seed // to seed data in your db
3. npm run test // to run tests
4. npm run dev // to run the server

A brief explanation of your design choices, particularly how you optimized for performance and scalability.
Indexed Database: Created indexes on fields frequently queried, such as userId in MyList, to speed up read operations.

Any assumptions you made during implementation.
User Authentication: Assumed that user authentication and authorization are already implemented and the user ID is available in the request context.