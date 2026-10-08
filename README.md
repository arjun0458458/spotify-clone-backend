# 🎵 Spotify Backend Clone A RESTful backend application inspired by Spotify, built using Node.js, Express.js, MongoDB and JWT authentication. The application provides user authentication, artist authorization, music uploads, album management and protected music retrieval APIs. ## 🚀 Features - User registration and login - JWT-based authentication - Secure password hashing using bcrypt - Cookie-based authentication - Artist authorization - Music upload functionality - Album creation and management - Retrieve all music - Retrieve all albums - Retrieve album by ID - MongoDB database integration - Image/file storage using ImageKit - Multer-based file uploads - Protected API routes ## 🛠️ Tech Stack - Node.js - Express.js - MongoDB - Mongoose - JWT - bcryptjs - Multer - ImageKit - Cookie Parser ## 📁 Project Structure
text
spotify-clone-backend/
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── album.model.js
│   │   ├── music.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── music.routes.js
│   │
│   ├── services/
│   │   └── storage.service.js
│   │
│   └── app.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js