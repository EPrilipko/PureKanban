## 📋 Advanced Kanban Board
A modern full-stack task management application featuring real-time updates, a flexible role-based access control (RBAC) system, and intelligent item sorting.
The project is built around production-ready architectural patterns, utilizing Feature-Sliced Design (FSD) on the frontend, a Code-First GraphQL approach on the backend, and is heavily optimized for complex, relational data manipulation.


👀 Live preview (powered by Supabase/Deplexo/Cloudflare pages)
------------------------------
[Live preview](https://pure-kanban-frontend.nero-36.workers.dev)

------------------------------

## 🎯 Project Status & Disclaimer

⚠️ **Disclaimer:** This repository is a personal **portfolio showcase** designed to demonstrate my current full-stack capabilities, architectural thinking, and familiarity with advanced engineering patterns. 

* **Not Production-Ready:** This application is intentionally simplified in certain areas (e.g., direct user creation without email verification) to focus heavily on complex core mechanics (real-time state sync, full-text search, and smart indexing).
* **Maintenance:** This project is in a **completed/frozen** state. No future feature updates, production hardening, or ongoing maintenance are planned. It serves purely as a technical demonstration.

------------------------------

## 🛠 Tech Stack
## Backend

* Runtime & Framework: NestJS (Node.js)
* API: GraphQL (Apollo Server, Code-First approach)
* Real-time: WebSockets (GraphQL Subscriptions for instant layout sync)
* ORM & DB: MikroORM + PostgreSQL (Full-Text Search via TSVector)
* Auth: Passport.js + JWT (Secure HTTP-Only Cookies)

## Frontend

* Framework: React + Vite
* Architecture: Feature-Sliced Design (FSD)
* State Management: Zustand
* GraphQL Client: Apollo Client (Heavy utilization of client cache & Relay-style pagination)
* Drag-and-Drop: @dnd-kit
* Type Safety: @graphql-codegen (Automated end-to-end type generation based on the GraphQL schema)

------------------------------
## 🏗 Key Engineering & Architectural Decisions

   1. Intelligent Sorting (Lexorank): Drag-and-drop column and card reordering is driven by a Lexorank sorting algorithm. This allows the backend to update an item's position using a single UPDATE query, completely eliminating the need to re-index the rest of the table.
   2. Relay-Style Pagination: Loading large sets of data (e.g., archived elements or extensive task history) is handled via Cursor-based pagination (edges, pageInfo, cursor), ensuring stable query performance regardless of database size.
   3. Native Full-Text Search (FTS): Implemented blazing-fast card filtering by titles and tags at the database layer. Database triggers handle the synchronous compilation of the search_vector.
   4. Type-Safe decoupled Frontend & Backend: The project is split into two completely isolated directories (frontend and backend). Cross-imports are non-existent; contract safety is strictly enforced by graphql-codegen on every API shift.
   5. Frontend Architecture (FSD): Organized under the Feature-Sliced Design methodology, which enforces a strict unidirectional dependency tree, modular isolation, and painless scalability.

------------------------------
## 🌟 Features
## 👥 Users & Access Control

* User registration and authentication via JWT.
* Board Sharing: Seamless board sharing among multiple users.
* Role-Based Access Control (RBAC): Granular permission management featuring AUTHOR, ADMIN, and READER roles. Rules are strictly validated on the backend (including WebSocket handshake guards).

## 📋 Kanban Boards & Columns

* Full CRUD capabilities for boards and columns.
* Smooth, production-ready column drag-and-drop.

## 🗂 Cards (Tasks)

* Complete CRUD operations for task titles and descriptions.
* Drag-and-drop card movement across and within columns.
* Task assignment featuring a single primary Assignee and multiple Participants.
* Activity Logs (Audit Trail): Automatically logs and saves the history of all mutation updates for any given card field.
* Comments: Real-time commenting system (create, edit, delete).
* Task Tags: Dynamic custom tags that support creation, editing, and mapping to tasks.

## 🔍 Search & Notifications

* Native PostgreSQL full-text search filtered by card titles and associated tags.
* In-app Notifications: Real-time push mechanics notifying users of critical events (e.g., being assigned to a task), complete with an "unread/read" inbox window.

------------------------------
## 📦 Repository Structure

├── backend/          # NestJS application, migrations, database seeders, docker-compose
└── frontend/         # React application structured by FSD

------------------------------
## 🚀 Getting Started
Ensure you have Node.js (LTS) and Docker installed.
## 🔑 Environment Variables Strategy
The project relies on environment configurations distributed across different scopes.

* Docker Compose Execution: Docker automatically orchestrates and links the separate .env files.
* Local Execution: The backend requires database credentials (from the root) and application configurations combined into a single /backend/.env file.

------------------------------
## 🐳 Option A: Full Orchestration via Docker Compose
Spawns the entire ecosystem (Database, Backend, Frontend) with zero local runtime dependencies.

```
cp .env.example .env

cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

docker-compose up --build -d
```

------------------------------
## 💻 Option B: Local Development Setup
Best for active feature coding, allowing fast hot-reloads and step-by-step debugging.
## 1. Database Infrastructure
Spin up only the persistent storage layer using the root configuration:

```
# From the root directory, configure and start the isolated DB container
cp .env.example .env
docker-compose up db -d
```

## 2. Backend Setup
For local execution, you must combine both the root ecosystem configurations (database connection strings) and backend-specific configurations into a single /backend/.env file.

```
cd backend
# 1. Install local dependencies
npm install
# 2. Create the combined environment file
cp .env.example .env
cat ../.env.example >> .env
# 3. Run MikroORM database migrations
npm run db:migration:up
# 4. (Optional) Seed the database with sandbox users and boards
npm run db:seeder:run
# 5. Start the development server with Hot Module Replacement (HMR)
npm run start:dev
```

## 3. Frontend Setup

```
cd frontend
# 1. Install local dependencies
npm install
# 2. Configure frontend variables
cp .env.example .env
# 3. Compile backend GraphQL schema definitions into strict TypeScript definitions
npm run graphql-codegen
# 4. Start the local Vite dev environment
npm run dev
```

------------------------------
## 🛠 Database & Migration CLI Commands (Backend)
When operating locally inside the /backend directory, use the following operational commands:

```
* npm run db:migration:create — Introspect database entity mutations and generate a new migration file.
* npm run db:migration:up — Safely apply all pending migrations up to the newest schema state.
* npm run db:seeder:run — Populate the active database with pre-built mock accounts, workspaces, and complex multi-assignee task workflows.
```
