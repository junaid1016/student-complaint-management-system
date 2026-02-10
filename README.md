# 🎓 Student Complaint Management System

A full‑stack **MERN-based web application** that allows students to submit complaints online and enables administrators to efficiently manage, track, and resolve those complaints.

This project is designed as a **college/final-year project** and demonstrates real-world backend, authentication, and database integration skills.

---

## 🚀 Features

### 👨‍🎓 Student Module

* Submit complaints online
* View submitted complaints
* Simple and user-friendly interface

### 👨‍💼 Admin Module

* Secure admin login (JWT authentication)
* View all student complaints
* Manage and monitor complaint data

### 🔐 Authentication & Security

* JWT-based authentication
* Secure environment variables using `.env`
* MongoDB Atlas cloud database

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose

### Tools

* Git & GitHub
* Postman
* VS Code

---

## 📂 Project Structure

```
student-complaint-management-system/
│
├── client/        # React frontend
├── server/        # Node + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/junaid1016/student-complaint-management-system.git
cd student-complaint-management-system
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/` and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

Backend will run at:

```
http://localhost:5000
```

---

## 📸 Screenshots

> Add screenshots of:

* Student complaint form
* Admin dashboard
* Complaint list

(You can add them later in a `screenshots/` folder)

---

## 📌 Use Case

* College grievance management
* Department-level complaint handling
* Learning full-stack MERN development

---

## 🧠 Learning Outcomes

* REST API development
* JWT authentication
* MongoDB Atlas integration
* Environment variable management
* Real-world Git & GitHub workflow

---

## 👤 Author

**Junaid Ansari**
GitHub: [https://github.com/junaid1016](https://github.com/junaid1016)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
