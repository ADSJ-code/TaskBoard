# TaskBoard (High-Performance Trello Clone)

**TaskBoard Preview**

(https://github.com/ADSJ-code/TaskBoard/blob/master/Captura%20de%20tela%202025-08-28%20004850.png?raw=true)

> **Live Demo:** https://task-board-flax.vercel.app/

## 📋 Overview

TaskBoard is a robust Kanban application designed to demonstrate **production-grade frontend architecture**. Unlike typical tutorials, this project focuses on performance, reproducibility, and state management.

It implements a full Drag-and-Drop interface, **automatic internationalization (English/Portuguese)** based on the user's browser, and runs inside a highly optimized **Docker** container serving static assets via **Nginx**.

---

## 🚀 Quick Start (Run with Docker)

You do not need Node.js installed to run this project. The entire environment is containerized.

1. **Clone the repository**

   ```bash
   git clone https://github.com/ADSJ-code/TaskBoard.git
   ```

   2. **Navigate to TaskBoard**

   ```bash
   cd TaskBoard
   ```

  ### 2.  Run with Docker Compose

  ```bash
  docker-compose up --build
  ```
### 3. Access the App Open your browser at:

http://localhost:3000

(Alternatively, for local dev: npm install && npm run dev)

### 🏗️ Architecture & Engineering Decisions
This project was built to simulate a real-world production environment.

1. **Multi-Stage Docker Build**
To optimize storage and bandwidth, we use a multi-stage build strategy:

Stage 1 (Builder): Uses a Node.js image to compile the React code (npm run build).

Stage 2 (Runner): Uses a lightweight Nginx Alpine image (~20MB) to serve the final static files, discarding the heavy Node.js modules (~1GB).

2. **Nginx Optimization**
The Nginx server is configured with:

Gzip Compression: Reduces payload size for faster loading over slow networks.

SPA Routing Fix: Uses try_files to handle React Router history mode correctly.

Cache Headers: Optimized for static asset caching.

3. **Automatic i18n (Internationalization)**
The application detects the browser's language (navigator.language).

EN (Default): "To Do", "In Progress", "Done"

PT-BR: "A Fazer", "Em Andamento", "Concluído"

No external libraries were used for this to demonstrate pure Javascript logic.

### ✨ Features
Full CRUD: Create, Read, Update (Edit text), and Delete cards.

Drag-and-Drop: Powered by @hello-pangea/dnd for smooth performance (React 18+ compatible).

Visual Feedback: Cards rotate and cast shadows when dragged.

Clean UI: Built with Chakra UI for a polished, accessible design.

### 🛠️ Tech Stack
Core: React.js (Vite)

UI/UX: Chakra UI, Beautiful DnD

Infrastructure: Docker, Docker Compose

Web Server: Nginx (Alpine Linux)

### 📝 License
This project is for educational purposes and portfolio demonstration.
