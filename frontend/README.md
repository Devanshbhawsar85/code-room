## 🏗️ **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/Devanshbhawsar85/code-room.git
cd code-room
2. Build and Start the Services
Use Docker Compose to build and start the services:

bash
Copy code
docker-compose up --build
3. Access the Application
Frontend: http://localhost
Backend: http://localhost:5000
🛠️ Development
Stop the Services
bash
Copy code
docker-compose down
Check Running Containers
bash
Copy code
docker ps
Remove All Containers
bash
Copy code
docker-compose down -v
📂 Environment Variables
You can configure the environment variables in the docker-compose.yml file:

Service	Variable	Description
Frontend	VITE_BACKEND_URL	Backend URL
Backend	NODE_ENV	Node environment (production/development)
Backend	PORT	Port for backend server
```
