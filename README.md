# MovieMenia.2.0

**Home Page**
![Home page](<Screenshot 2026-01-27 125213.png>)

**Movie Details with Recommendations**
![Movie details](<localhost_5173_movie_1084242 (1).png>)

# 🔗 Live Links

### 🌐 Live Website
<p align="center">
  <a href="moviemenia-2-0-1.onrender.com/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit-success?style=for-the-badge">
  </a>
</p>

### Github Repository
<p>
  <a href="https://github.com/KeyaRaniMondal/MovieMenia.2.0">
    <img src="https://img.shields.io/badge/Frontend-GitHub-blue?style=for-the-badge&logo=github">
  </a>
</p>

---

# 📖 Overview

# 📖 Overview

**MovieMenia** is a modern full-stack movie discovery platform built with the MERN stack that combines real-time movie exploration with AI-powered recommendations. Leveraging **The Movie Database (TMDb) API**, users can browse trending, popular, top-rated, and upcoming movies, search their favorite titles, and access detailed information including ratings, genres, cast, trailers, and overviews.

The application features **secure JWT-based authentication**, allowing users to create accounts, log in safely, and enjoy personalized experiences. An integrated **AI recommendation system powered by Google Gemini** analyzes user prompts and preferences to suggest movies tailored to their interests, making movie discovery faster and more engaging.

Built with **React**, **Express.js**, **MongoDB**, and **Zustand**, MovieMenia follows modern development practices with a responsive UI, efficient state management, RESTful APIs, and a scalable backend architecture. Designed for both desktop and mobile devices, it delivers a fast, intuitive, and immersive movie browsing experience.

---

# ✨ Features

- 🔐 Secure Authentication
- 👤 User Profile Management
- 📱 Fully Responsive Design
- ⚡ Fast SPA using React + Vite
- 🌙 Modern UI
- 🔄 REST API Integration
- 🍪 JWT Authentication using Cookies
- 📡 Global State Management with Zustand
- 🔔 Toast Notifications
- 📱 Mobile Friendly Interface
- 🚀 Optimized Performance

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- React Router v7
- Axios
- Zustand
- Lucide React
- Swiper.js
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser
- CORS
- dotenv

---

# 📦 Main Dependencies

## Frontend

```json
@google/genai
axios
lucide-react
react
react-dom
react-hot-toast
react-router-dom
swiper
zustand
```

## Backend

```json
bcrypt
cookie-parser
cors
dotenv
express
jsonwebtoken
mongodb
mongoose
nodemon
```

---

# 📁 Folder Structure

```
Project
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation Guide

## Clone the Repository

```bash
git clone https://github.com/KeyaRaniMondal/MovieMenia.2.0.git
```

```
cd MovieMenia.2.0
```

---

## Frontend Setup

```
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_GEMINI_API_KEY=YOUR_KEY
```

Run

```bash
npm run dev
```

---

## Backend Setup

```
cd backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

CLIENT_URL=http://localhost:5173
```

Run Server

```bash
node Server.js
```

or

```bash
nodemon Server.js
```

---

# 👨‍💻 Future Improvements

- Dark Mode
- Real-time Notifications
- Role-based Authorization
- Image Upload Optimization
- Better Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Added New Feature"
```

4. Push

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---
⭐ If you like this project, don't forget to give it a star!



