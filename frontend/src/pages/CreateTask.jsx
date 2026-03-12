import { useState, useEffect } from "react";
import API from "../services/api";

export default function CreateTask() {

  const [projects, setProjects] = useState([]);

  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {

    API.get("/projects")
      .then(res => setProjects(res.data));

  }, []);

  const createTask = async () => {

    await API.post("/tasks", {
      project_id: projectId,
      task_title: title,
      task_description: desc,
      assignee_id: assignee || null
    });

    alert("Task created!");

    setTitle("");
    setDesc("");
  };

  return (

    <div className="container">

      <h1>Create Task</h1>

      {/* Project Dropdown */}

      <label>Select Project</label>

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      >

        <option value="">Select a project</option>

        {projects.map(p => (

          <option
            key={p.project_id}
            value={p.project_id}
          >

            {p.project_name}

          </option>

        ))}

      </select>


      <label>Task Title</label>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Description</label>

      <textarea
        placeholder="Optional description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <label>Assignee ID (optional)</label>

      <input
        placeholder="User ID"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />

      <button onClick={createTask}>
        Create Task
      </button>

    </div>
  );
}