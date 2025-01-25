# Task Management API

## Description

The **Task Management API** is a backend service designed to simplify task management for users and administrators. 

### Key Functionalities

#### **User Capabilities**
- **Create**: Add new tasks with attributes such as title, description, status, due date, and priority.
- **Read**: View their own tasks or a list of all their tasks.
- **Update**: Modify existing tasks.
- **Delete**: Remove tasks they own.

#### **Admin Capabilities**
- Access and manage all tasks within the system.

Built with a modern tech stack, this API emphasizes scalability, maintainability, and performance.

---

## Table of Contents
1. [Tech Stack](#tech-stack)  
2. [Features](#features)  
3. [Setup and Installation](#setup-and-installation)  
4. [Environment Variables](#environment-variables)  
5. [Database Migrations](#database-migrations)  
6. [Running the Application](#running-the-application)  
7. [API Endpoints](#api-endpoints)  
8. [Contributing](#contributing)  

---

## Tech Stack

- **Node.js**: JavaScript runtime environment.  
- **Express**: Web framework for building the API.  
- **Prisma**: ORM for database interactions.  
- **TypeScript**: Adds static typing to JavaScript for reliability.  
- **Redis**: In-memory data store for caching.  
- **Zod**: Schema declaration and validation.  
- **MySQL**: Relational database.  
- **MongoDB**: NoSQL database for flexible data storage.

---

## Features

- **User Authentication**: Secure login system for users and admins.  
- **Task Management**: Create, read, update, and delete tasks, including assigning priorities and due dates.  
- **Admin Controls**: Access and manage all tasks.  
- **Data Validation**: Leveraging Zod schemas for strong validation.  
- **Caching**: Redis integration for performance optimization.  

---

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)  
- [npm](https://www.npmjs.com/) (v6.x or later)  
- [TypeScript](https://www.typescriptlang.org/) (v4.x or later)  
- MySQL server  
- MongoDB server  
- Redis server  

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MohsenSaf/Task_management_API.git
   cd Task_management_API
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile TypeScript**:
   ```bash
   npx tsc
   ```

---

## Environment Variables

Create a `.env` file in the root directory. Refer to `.env.example` for the required variables:

- `DATABASE_URL`: Connection string for MySQL.  
- `MONGODB_URI`: Connection string for MongoDB.  
- `REDIS_HOST`: Hostname for Redis.  
- `REDIS_PORT`: Port for Redis.  
- `JWT_SECRET`: Secret key for JSON Web Token authentication.  
- `PORT`: Port number on which the server will run.  

Ensure all variables are correctly set before starting the application.

---

## Database Migrations

1. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate deploy
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

---

## Running the Application

Start the server using:

```bash
npm start
```

By default, the API is accessible at `http://localhost:3000`. You can configure the port via the `PORT` environment variable.

---

## API Endpoints

### **Authentication**
- **POST `/auth/register`**: Register a new user.  
- **POST `/auth/login`**: Authenticate a user and retrieve a token.  
- **GET `/auth/getToken`**: Retrieve an access token.  
- **GET `/auth/logout`**: Logout the user.

### **Tasks**
- **POST `/tasks`**: Create a new task.  
- **GET `/tasks`**: Retrieve all tasks for the authenticated user.  
- **GET `/tasks/:id`**: Retrieve a specific task by ID.  
- **PUT `/tasks/:id`**: Update a task by ID.  
- **DELETE `/tasks/:id`**: Delete a task by ID.

### **Admin**
- **GET `/admin/tasks`**: Retrieve all tasks (admin only).  
- **GET `/admin/tasks/:id`**: Retrieve a specific task by ID (admin only).  
- **PUT `/admin/tasks/:id`**: Update a task by ID (admin only).  
- **DELETE `/admin/tasks/:id`**: Delete any task by ID (admin only).

**Note**: All task-related endpoints require authentication with a valid JWT token.

---

## Contributing

We welcome contributions! Here's how you can get involved:

1. **Fork the repository**:  
   ```bash
   git clone https://github.com/MohsenSaf/Task_management_API.git
   ```

2. **Create a new branch**:
   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Add YourFeature"
   ```

4. **Push your branch**:
   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request** on GitHub.

Please ensure your code adheres to the project's coding standards and includes relevant tests.

---

Feel free to reach out if you have any questions or need assistance! Happy coding! 🚀

