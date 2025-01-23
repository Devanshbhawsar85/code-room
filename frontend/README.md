Real-Time Code Editor
A real-time collaborative code editor that allows multiple users to write, edit, and run code together, instantly seeing each other's changes and outputs. The project integrates front-end and back-end technologies for a smooth real-time experience.

Features
Real-Time Collaboration: Users can join a coding room and collaborate on code in real-time.
Syntax Highlighting: Supports multiple programming languages (JavaScript, Python, Java, C++).
Live Code Execution: Execute code in different languages and see the output instantly.
User Typing Indicators: Get notified when other users are typing in the same room.
Room Management: Users can create and join unique rooms using a Room ID.
Language Support: Ability to select programming languages dynamically.
Code Sharing: Easily share the room link to invite others to collaborate.
Tech Stack
Frontend:
React: For building the user interface.
Monaco Editor: For a feature-rich code editor with syntax highlighting, auto-completion, and more.
Socket.io: For real-time communication between the frontend and backend.
Backend:
Node.js: For server-side logic.
Express: For handling HTTP requests and serving the application.
Socket.io: For real-time communication and broadcasting code changes.
Axios: For making HTTP requests to external services for code execution.
Piston API: A REST API used to execute code in various programming languages.
How to Run Locally
Prerequisites
Before running the project locally, make sure you have:

Node.js installed.
Git installed.
Steps to Set Up the Project
Clone the Repository:

bash
Copy
git clone <repository_url>
cd <project_directory>
Install Dependencies:

In the root directory, run the following command to install all necessary dependencies:

bash
Copy
npm install
Set up Backend (Server):

Navigate to the backend folder (if separated) and install dependencies:

bash
Copy
cd backend
npm install
Run the server:

bash
Copy
npm start
This will start the server on http://localhost:5000.

Run the Frontend (Client):

Navigate to the frontend folder and install dependencies:

bash
Copy
cd frontend
npm install
Start the React application:

bash
Copy
npm start
The frontend will be accessible at http://localhost:3000.

Access the Application:

Open your browser and go to http://localhost:3000. You should see the real-time code editor interface.

Optional: Deploy to Production:

To deploy the app, follow the deployment instructions for your chosen platform (e.g., AWS, Heroku, Render, etc.).
Ensure the frontend and backend are both deployed, with the frontend making API calls to the backend’s production URL.
Usage
Create a Room:
Enter a unique Room ID and your name in the provided form on the homepage.
Click "Join Room" to enter the code editor.
Collaborate:

Once inside the room, you and other users can type code simultaneously.
Changes made by any user are broadcast to all users in the same room in real-time.
Select Programming Language:

Select your desired language (JavaScript, Python, Java, C++) from the dropdown in the sidebar.
Run Code:

Click the "Execute" button to run the code.
The output will be displayed in the console below the editor.
Share Room:

Copy the Room ID to invite others to join the same room.
Contributing to this project
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
