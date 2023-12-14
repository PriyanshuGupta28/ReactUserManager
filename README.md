# React User Management
This project is a full-stack web application built with React for the frontend and Node.js with Express and MongoDB for the backend. It provides a user management system with functionalities to create, read, update, and delete user records.

Tech Stack
Frontend:

React: A JavaScript library for building user interfaces. The frontend of this project is built using React, providing a dynamic and responsive user interface.

Material-UI: A popular React UI framework that provides a set of customizable and accessible components for building modern user interfaces.

react-phone-input-2: A React component for entering and validating international telephone numbers.

Backend:

Node.js: A JavaScript runtime built on the V8 JavaScript engine. It allows the execution of JavaScript code server-side.

Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

MongoDB: A NoSQL database that stores data in flexible, JSON-like documents. MongoDB is used for storing and retrieving user data.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a straightforward schema-based solution to model application data.

State Management:

Redux: A predictable state container for JavaScript applications. It helps manage the state of the application in a consistent and scalable way.

Redux Thunk: A middleware for Redux that allows you to write action creators that return a function instead of an action. It is used for handling asynchronous actions.

Features
User Listing: View a list of all users with details such as name, email, mobile number, address, and location information.

User Creation: Add new users to the system by providing necessary details like name, email, mobile number, and address.

User Editing: Modify existing user information, including name, email, mobile number, and address.

User Deletion: Remove users from the system, ensuring data integrity.

File Structure
plaintext
Copy code
ReactUserManagement/
|-- Frontend/                  # Frontend code (React)
|   |-- public/
|   |-- build/                # Production build (deployed)
|   |-- ...
|-- Backend/                  # Backend code (Node.js with Express)
|   |-- ...
|-- .gitignore
|-- README.md               # Project documentation
Deployment Links
Frontend Deployment: https://reactusermanager.vercel.app/

Backend Deployment: https://reactusermanagment.onrender.com/api/users

Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/ReactUserManagement.git
cd ReactUserManagement
Install dependencies for both frontend and backend:

bash
Copy code
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
Set up environment variables:

Create a .env file in the server directory and define the following variables:

plaintext
Copy code
MONGO_URL=mongodb+srv://28priyanshu2001:svthDeUrQHczHOef@reactusermanager.rjt6ac4.mongodb.net/
PORT=4000
Run the application:

bash
Copy code
# Start the frontend (from the 'client' directory)
npm start

# Start the backend (from the 'server' directory)
npm start
Access the application in your browser at http://localhost:3000 .

Code Structure
Client (React):

The frontend code is organized into components and pages. The redux directory contains the Redux store configuration.

Server (Node.js with Express):

The backend code is structured with controllers, models, and routes. The server.js file is the entry point for the Node.js app.

Comments and Documentation
The codebase is well-commented to enhance readability and understanding. Please refer to the comments for explanations and details on specific sections.

Feel free to explore the code and reach out if you have any questions or suggestions!
