import express from "express";
import http from "http";
import { Server } from "socket.io";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv"; //  Import dotenv

dotenv.config(); //  Load environment variables

const app = express();

const FRONTEND_URLS = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost",
  "http://localhost:80",
  "http://35.174.136.48",
  "http://35.174.136.48:5000",
  "http://35.174.136.48:5173",
  "http://35.174.136.48:80",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (FRONTEND_URLS.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URLS, //  Corrected
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log(` User Connected: ${socket.id}`);

  let currentRoom = null;
  let currentUser = null;

  socket.on("join", ({ roomId, userName }) => {
    if (currentRoom) {
      socket.leave(currentRoom);
      rooms.get(currentRoom)?.delete(currentUser);
      io.to(currentRoom).emit(
        "userJoined",
        Array.from(rooms.get(currentRoom) || [])
      );
    }

    currentRoom = roomId;
    currentUser = userName;
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    rooms.get(roomId).add(userName);
    io.to(roomId).emit("userJoined", Array.from(rooms.get(roomId) || []));
  });

  socket.on("leaveRoom", () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom)?.delete(currentUser);
      io.to(currentRoom).emit(
        "userJoined",
        Array.from(rooms.get(currentRoom) || [])
      );
      if (rooms.get(currentRoom)?.size === 0) {
        rooms.delete(currentRoom);
      }
    }
    socket.leave(currentRoom);
    currentRoom = null;
    currentUser = null;
  });

  socket.on("codeChange", ({ roomId, code }) => {
    if (roomId && code !== undefined) {
      socket.to(roomId).emit("codeUpdate", code);
    }
  });

  socket.on("compileCode", async (data) => {
    console.log(" Compile request received:", data);

    if (!data?.code || !data?.roomId || !data?.language) {
      console.log(" Invalid data received");
      return io
        .to(data.roomId)
        .emit("codeResponse", { error: "Invalid request" });
    }

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: data.language,
          version: data.version || "latest",
          files: [{ content: data.code }],
        },
        {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(" Compiler Response:", response.data);
      io.to(data.roomId).emit("codeResponse", response.data);
    } catch (error) {
      console.error(
        "Compilation Error:",
        error.response?.data || error.message
      );
      io.to(data.roomId).emit("codeResponse", {
        error: error.response?.data?.error || "Compilation failed",
      });
    }
  });

  socket.on("disconnect", () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom)?.delete(currentUser);
      io.to(currentRoom).emit(
        "userJoined",
        Array.from(rooms.get(currentRoom) || [])
      );
      if (rooms.get(currentRoom)?.size === 0) {
        rooms.delete(currentRoom);
      }
    }
    console.log(` User Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Code Collaboration Server!");
});

// ✅ API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ Ensure server works inside Docker
server.listen(PORT, "0.0.0.0", () => {
  console.log(` Backend server is running on port ${PORT}`);
});
