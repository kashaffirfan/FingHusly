# 🏠 FindHusly

FindHusly is a **full-stack MERN (MongoDB, Express, React, Node.js)** web application that helps users **search, filter, and list properties** seamlessly.  
It’s a modern housing finder platform designed for smooth browsing, authentication, and property management.

---

## 🚀 Features

✅ **User Authentication**
- Register, login, and manage accounts using JWT tokens.  
- Secure password handling with bcrypt.

✅ **Property Management**
- Add, edit, delete, and view property listings.  
- Filter by price, location, and property type.  
- Each user sees only their own listings.

✅ **Responsive UI**
- Built using **React + Tailwind CSS** for modern design and responsiveness.  
- Mobile-friendly and optimized for speed.

✅ **Agent & User Roles**
- Role-based visibility (Agents can post properties, users can browse and save favorites).

✅ **Integrated Backend API**
- Built with Node.js & Express.  
- Connected to MongoDB Atlas for NoSQL data storage.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB / MongoDB Atlas |
| **Authentication** | JWT (JSON Web Token), bcrypt |
| **Version Control** | Git & GitHub |
| **Package Manager** | npm / yarn |

---

## 📁 Folder Structure

FindHusly/
│
├── client/ # Frontend (React + Tailwind)
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Main pages (Home, Login, Register, Dashboard)
│ │ ├── assets/ # Images, logos, and icons
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
├── server/ # Backend (Node + Express + MongoDB)
│ ├── config/ # DB connection, environment setup
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Auth middlewares (JWT verify)
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── server.js # Main entry file
│ └── package.json
│
├── .env.example # Environment variables (sample)
├── README.md # Documentation
└── package.json # Root package (optional, if managing concurrently)