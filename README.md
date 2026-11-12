# SQLCLASS — User Management System

A backend-focused CRUD application built using **Node.js, Express.js, MySQL, and EJS**. This project demonstrates how a web application handles user data through database operations and server-side routing.

## Overview

SQLCLASS is a simple user management application where users can be created, viewed, updated, and deleted. It was developed as a hands-on project to understand backend development, RESTful routes, MySQL database integration, and server-side rendering.

## Features

- **View Users:** Display all registered users.
- **View User Details:** Access individual user information.
- **Create Users:** Add new users to the database.
- **Update Users:** Edit existing user information.
- **Delete Users:** Remove users from the database.
- **UUID Integration:** Use unique identifiers for user records.
- **Server-Side Rendering:** Render dynamic pages using EJS.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MySQL | Relational database |
| EJS | Dynamic HTML rendering |
| mysql2 | MySQL database connectivity |
| method-override | Support for PUT/PATCH/DELETE form methods |
| UUID | Unique user identification |

## Project Structure

```text
SQLCLASS/
│
├── views/
│   ├── home.ejs
│   ├── show.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   └── delete.ejs
│
├── index.js
├── schema.sql
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd SQLCLASS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MySQL

- Make sure MySQL is installed and running.
- Create the required database.
- Import the SQL commands from `schema.sql`.
- Configure your database connection credentials in the application.

### 4. Run the Application

```bash
node index.js
```

### 5. Open in Browser

```text
http://localhost:8080
```

## Learning Outcomes

Through this project, I practised:

- Building backend applications using Express.js.
- Implementing CRUD operations.
- Connecting Node.js applications with MySQL.
- Writing SQL queries and managing database records.
- Working with dynamic EJS templates.
- Understanding HTTP methods and backend routing.
- Using UUIDs for unique record identification.

## Future Improvements

- Implement secure authentication and authorization.
- Add password hashing and input validation.
- Improve error handling.
- Add pagination and search functionality.
- Deploy the application online.

---

**Note:** This is a learning project developed to strengthen my backend development and database fundamentals.