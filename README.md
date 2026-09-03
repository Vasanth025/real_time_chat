# Real-Time Chat Application

A full-stack, real-time messaging web application built with the MERN stack and Socket.io. This application allows users to sign up, log in, manage their profile, and chat with other users in real-time, including sending text messages and images.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.io.
- **Authentication**: Secure JWT-based authentication with HTTP-only cookies.
- **Image Sharing**: Upload and share images within chats, powered by Cloudinary.
- **State Management**: Efficient global state management with Zustand.
- **Responsive UI**: Beautiful and modern UI built with Tailwind CSS and DaisyUI components.
- **Secure Passwords**: Password hashing using bcrypt.js.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Routing**: React Router DOM
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Real-time**: Socket.io-client
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Real-time**: [Socket.io](https://socket.io/)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Media Storage**: [Cloudinary](https://cloudinary.com/)

## 📂 Project Structure

```
real-time-chat/
├── backend/          # Node.js + Express API & Socket server
│   ├── controllers/  # Route logic
│   ├── middleware/   # Express middlewares
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   ├── utils/        # Helpers (e.g., socket setup)
│   └── app.js        # Entry point for backend
│
└── frontend/         # React Vite application
    ├── public/       # Static assets
    ├── src/          # React components, pages, stores
    └── index.html    # Entry point for frontend
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)
- Cloudinary account

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd real-time-chat
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
# App runs on http://localhost:5173
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
