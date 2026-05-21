# PrimeTrade Task Manager

A full-stack task management application with JWT authentication and Role-Based Access Control (RBAC).

## Features

- User Registration & Login
- JWT Authentication
- Role-Based Access (Admin/User)
- Task CRUD Operations
- Admin Dashboard
- Protected Routes
- MongoDB Database
- Modern React UI

## Tech Stack

### Backend
- FastAPI
- MongoDB
- JWT
- Motor

### Frontend
- React
- Vite
- Axios

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Documentation

```txt
http://127.0.0.1:8000/docs
```

## Scalability Notes

- Modular FastAPI architecture
- JWT stateless authentication
- MongoDB scalable document storage
- RBAC authorization
- Separate frontend/backend deployment