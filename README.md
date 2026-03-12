# AI-Assisted Mini Project Management Tool

A backend application for managing **projects, tasks, and comments** with **AI-assisted task description generation and priority suggestion**.  
Built using **FastAPI, PostgreSQL (Supabase), SQLAlchemy**, and **OpenRouter AI models**.

---

# 🚀 Features

- Project Management (CRUD)
- Task Management (CRUD)
- Task Filtering (status, priority, assignee)
- Task Search (partial title match)
- Task Board (TODO / IN_PROGRESS / DONE grouping)
- Comments on Tasks
- AI-Assisted Task Description Generation
- AI-Based Priority Suggestion
- REST API with FastAPI
- PostgreSQL Database (Supabase compatible)

---

# 🧠 AI Capabilities

When creating a task:

- If **task description is missing** → AI **generates description**
- If **task description is provided** → AI **refines description**
- AI suggests **priority level (LOW, MEDIUM, HIGH)**

The AI integration uses the OpenRouter model:
```bash
arcee-ai/trinity-large-preview:free
```

---

# 🏗️ Project Structure
```bash
project_root
│
├── main.py
├── requirements.txt
├── .env
│
├── database
│ └── database.py
│
├── models
│ ├── user.py
│ ├── project.py
│ ├── task.py
│ └── comment.py
│
├── schemas
│ ├── user_schema.py
│ ├── project_schema.py
│ ├── task_schema.py
│ └── comment_schema.py
│
├── routers
│ ├── user_router.py
│ ├── project_router.py
│ ├── task_router.py
│ └── comment_router.py
│
├── services
│ └── ai_service.py
│
└── README.md
```
---

# ⚙️ Installation

## 1️⃣ Clone Repository
```bash
git clone <repository_url>
cd project_root
```


---

## 2️⃣ Create Virtual Environment
```bash
python -m venv venv
```


Activate it:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac
```bash
source venv/bin/activate
```

---

## 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

---

# 🗄️ Database Setup

The project uses **PostgreSQL (Supabase)**.

Create the following tables:

- users
- projects
- tasks
- comments

Example SQL schema:

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(200) NOT NULL,
    domain VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    project_id UUID NOT NULL,
    task_title VARCHAR(255) NOT NULL,
    task_description TEXT,
    status VARCHAR(20) DEFAULT 'TODO',
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    assignee_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#🔑 Environment Variables

Create a .env file in the root directory.

```bash
DATABASE_URL=postgresql://username:password@host:5432/database
OPENROUTER_API_KEY=your_openrouter_api_key
```

# ▶️ Running the Application

Start the FastAPI server:
```bash
uvicorn main:app --reload
```

Server will run at:
```bash
http://127.0.0.1:8000
```

Swagger API documentation:
```bash
http://127.0.0.1:8000/docs
```

## 📡 API Endpoints

### 👤 Users

| Method | Endpoint | Description |
|------|------|------|
| POST | `/users` | Create a new user |
| GET | `/users` | Retrieve all users |
| GET | `/users/{user_id}` | Retrieve a specific user |
| DELETE | `/users/{user_id}` | Delete a user |

---

### 📁 Projects

| Method | Endpoint | Description |
|------|------|------|
| POST | `/projects` | Create a new project |
| GET | `/projects` | Retrieve all projects |
| PUT | `/projects/{project_id}` | Update a project |
| DELETE | `/projects/{project_id}` | Delete a project |
| GET | `/projects/{project_id}/tasks` | Retrieve all tasks for a specific project |

---

### 📋 Tasks

| Method | Endpoint | Description |
|------|------|------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/{task_id}` | Retrieve a specific task |
| PUT | `/tasks/{task_id}` | Update a task |
| DELETE | `/tasks/{task_id}` | Delete a task |
