# PrimeTrade Task Manager

A full-stack task management application built using FastAPI, React, MongoDB Atlas, and JWT Authentication with Role-Based Access Control (RBAC).

---

# Live Deployment

## Frontend
https://primetrade-frontend-8kei.onrender.com/

## Backend
https://primetrade-backend-mtdd.onrender.com/

## Swagger API Documentation
https://primetrade-backend-mtdd.onrender.com/docs

---

# Project Overview

PrimeTrade Task Manager is a secure task management platform where users can create and manage their own tasks while administrators can manage all tasks across the platform.

The project demonstrates:

- JWT Authentication
- Role-Based Access Control (RBAC)
- REST API Development
- Full-Stack Integration
- Cloud Deployment
- Secure Backend Architecture

---

# Features

## Authentication
- User Registration
- User Login
- JWT Token Authentication
- Password Hashing using bcrypt
- Protected Routes

---

## User Features
- Create Tasks
- View Own Tasks
- Edit Own Tasks
- Delete Own Tasks

---

## Admin Features
- View All Platform Tasks
- Edit Any User's Task
- Delete Any User's Task
- Administrative Dashboard Access

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS3

## Backend
- FastAPI
- Python
- JWT Authentication
- Motor (Async MongoDB Driver)

## Database
- MongoDB Atlas

## Deployment
- Render Static Site
- Render Web Service

---

# Folder Structure

```txt
primetrade-assignment/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# API Endpoints

## Authentication APIs

### Register User
```http
POST /api/v1/auth/register
```

### Login User
```http
POST /api/v1/auth/login
```

---

## Task APIs

### Create Task
```http
POST /api/v1/tasks
```

### Get User Tasks
```http
GET /api/v1/tasks
```

### Update Task
```http
PUT /api/v1/tasks/{task_id}
```

### Delete Task
```http
DELETE /api/v1/tasks/{task_id}
```

---

## Admin APIs

### Get All Tasks
```http
GET /api/v1/tasks/admin/all-tasks
```

---

# Demo Credentials

## Admin Account

```txt
Email: admin@test.com
Password: admin123
```

---

# Local Setup

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

## Backend `.env`

```env
MONGO_URL=your_mongodb_atlas_url
SECRET_KEY=your_secret_key
```

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization
- Admin Route Protection

---

# Scalability Notes

- Modular FastAPI backend architecture
- Stateless JWT authentication
- Async MongoDB operations using Motor
- Separate frontend/backend deployment
- Scalable MongoDB Atlas cloud database
- Easily extendable API structure

---

# Deployment Architecture

```txt
Frontend (Render Static Site)
        ↓
Backend API (Render Web Service)
        ↓
MongoDB Atlas
```

---

# Submission Links

## GitHub Repository
(Add your GitHub repository link here)

## Frontend Deployment
https://primetrade-frontend-8kei.onrender.com/

## Backend Deployment
https://primetrade-backend-mtdd.onrender.com/

## Swagger Documentation
https://primetrade-backend-mtdd.onrender.com/docs

---

# Final Status

The project successfully implements:

- Full-stack architecture
- JWT Authentication
- Role-Based Access Control (RBAC)
- CRUD Operations
- Secure REST APIs
- MongoDB Cloud Integration
- Modern Responsive UI
- Cloud Deployment
- Admin/User Separation

---