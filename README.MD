# 🚀 Space Blog (in Pogress)

**Space Blog** is a backend blog platform built with **Node.js**, **Express**, **PostgreSQL**, and **Docker**, designed using modern enterprise patterns like **Domain-Driven Design (DDD)**, **CQRS**, and **Domain Events**.

This project is part of my professional portfolio and showcases my ability to structure scalable and maintainable backend systems following industry best practices.

---

## 🧠 Key Features

- 🧩 **Domain-Driven Design (DDD)**: Rich domain model separating core business logic from infrastructure concerns.
- 🔄 **CQRS Architecture**: Commands and queries are handled separately for better scalability and testability.
- 📣 **Domain Events**: Decoupled communication between aggregates, allowing side effects like post count updates.
- 🐘 **PostgreSQL with Docker**: Databases are containerized for easy development and testing.
- 🔐 **Authentication & Authorization**: Users can register, login, and create content. Role-based access control supported.
- ✍️ **Blog Functionality**:
  - Users can create posts and leave comments
  - Posts and comments support likes
  - Automatic post count tracking per user
- ✅ **E2E Testing Support** via `npm run test`

---

## ⚙️ Technologies Used

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL** (via Docker)
- **Sequelize ORM**
- **Jest** for testing
- **Docker** & **Docker Compose**
- **ESLint**, **Prettier** for code quality

---

## 🏁 Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/aircunza/blog-space.git
cd space-blog
npm install
```

### Running the Project

Spin up the databases and start the backend:

```bash
# Start PostgreSQL and pgAdmin
docker-compose up -d

# Start the development server
npm run dev
```

### Running Tests

```bash
npm run test
```

---

## 🧱 Database Schema

The core of the system is built around the following entities:

- **Users**
  - Fields: `username`, `email`, `password`, `role`, `posts_count`
- **Posts**
  - Fields: `title`, `content`, `author_id`, `likes_count`
- **Comments**
  - Fields: `content`, `post_id`, `author_id`, `likes_count`
- **Likes**
  - Enforces a unique like per user per post

---

## 🧭 Architecture Overview

This project implements:

### ✅ Domain-Driven Design

The codebase is organized into bounded contexts, with entities, value objects, aggregates, and domain services clearly separated from application services and infrastructure.

### ✅ CQRS

Commands (write operations) and Queries (read operations) are handled via dedicated handlers and buses. This improves performance, clarity, and maintainability.

### ✅ Domain Events

Events like `PostCreated` or `CommentAdded` are dispatched after domain actions and handled asynchronously. For example:

- A `PostCreated` event updates the author’s `posts_count`
- Events can be extended to send notifications, logs, or analytics

---

## 📜 License

This project is open-source and available under the MIT License.
