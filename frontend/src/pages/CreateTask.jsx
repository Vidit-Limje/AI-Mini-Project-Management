import { useState } from "react";
import API from "../services/api";

export default function CreateTask() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [projectId, setProjectId] = useState("");

  const createTask = async () => {

    const res = await API.post("/tasks", {
      project_id: projectId,
      task_title: title,
      task_description: desc
    });

    alert("Task Created!");
  };

  return (
    <div>

      <h1>Create Task</h1>

      <input
        placeholder="Project ID"
        onChange={e => setProjectId(e.target.value)}
      />

      <input
        placeholder="Task Title"
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        onChange={e => setDesc(e.target.value)}
      />

      <button onClick={createTask}>
        Create Task
      </button>

    </div>
  );
}