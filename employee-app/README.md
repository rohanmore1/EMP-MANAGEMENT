🚀 Employee Management CRUD Application
Project Description
This project is an Employee Management System created using the MEEN Stack (MongoDB, Express, Employee, Node.js) with a modern Angular Standalone Frontend. It fulfills the requirements of a standard CRUD (Create, Read, Update, Delete) application test.

Users can perform the following core functions:


Add Employee 


View Employee List 


Edit Employee 


Delete Employee 


Search Employee (Filtering by Name, Email, or Department) 


Validate Form Fields (using Angular Reactive Forms) 

🛠️ Prerequisites
Before starting, ensure you have the following installed on your system:

Node.js & npm: (LTS version recommended)

Angular CLI: (Installed globally via npm install -g @angular/cli)

MongoDB: A running instance of MongoDB (Local or Atlas) accessible at the connection string specified in the backend code.

⚙️ Installation and Setup
This project consists of two separate applications: the Node/Express Backend (/server) and the Angular Frontend (/employee-app). Both must be installed and run separately.

1. Backend Setup (/server)
Navigate to the server directory:

Bash

cd employee-management/server
Install Node dependencies:

Bash

npm install
Verify Database Connection: Ensure your MongoDB instance is running. The server attempts to connect to: mongodb://localhost:27017/employeeDB.

2. Frontend Setup (/employee-app)
Navigate to the Angular project directory:

Bash

cd ../employee-app
Install Angular dependencies:

Bash

npm install
▶️ Running the Application
You must start the backend server first, followed by the Angular frontend.

Step 1: Start the Backend API
From the server directory, run the main file:

Bash

node server.js
Output expected: Server listening on port 3000 and Successfully connected to MongoDB!

The API endpoints are now available at http://localhost:3000/api/employees.

Step 2: Start the Angular Frontend
From the employee-app directory, start the Angular development server:

Bash

npm start 
# or ng serve --open
Output expected: The application will compile and automatically open in your browser at http://localhost:4200.

📝 Key Technologies Used
Frontend: Angular (Standalone Components)

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose ODM)

Styling: Custom CSS

Notifications: Custom Toast Service (Non-blocking user feedback)