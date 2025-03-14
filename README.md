🏗️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Devanshbhawsar85/code-room.git
   cd code-room
   ```

2. **Build and Start the Services**

   ```bash
   docker-compose up --build
   ```

3. **Access the Application**
   - **Frontend:** http://localhost
   - **Backend:** http://localhost:5000

## 🛠️ **Development Commands**

- **Stop Services:**

  ```bash
  docker-compose down
  ```

- **Check Running Containers:**

  ```bash
  docker ps
  ```

- **Remove All Containers:**
  ```bash
  docker-compose down -v
  ```

## 🔧 **Environment Variables**

Configure these in `docker-compose.yml`:

| Service  | Variable           | Description                                   |
| -------- | ------------------ | --------------------------------------------- |
| Frontend | `VITE_BACKEND_URL` | Backend URL                                   |
| Backend  | `NODE_ENV`         | Node environment (`production`/`development`) |
| Backend  | `PORT`             | Port for backend server                       |
