import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {

  const [tasks,setTasks] = useState([]);
  const [projects,setProjects] = useState([]);
  const [selectedProject,setSelectedProject] = useState("");

  useEffect(()=>{

    API.get("/tasks").then(res => setTasks(res.data));

    API.get("/projects").then(res => setProjects(res.data));

  },[]);

  const filterTasks = async(projectId)=>{

    setSelectedProject(projectId);

    const res = await API.get(`/projects/${projectId}/tasks`);

    setTasks(res.data);
  }

  return (

    <div className="container">

      <h1>🚀 AI Project Dashboard</h1>

      {/* Project Filter */}

      <select
        onChange={(e)=>filterTasks(e.target.value)}
      >

        <option>Select Project</option>

        {projects.map(p => (
          <option key={p.project_id} value={p.project_id}>
            {p.project_name}
          </option>
        ))}

      </select>

      <div className="board">

        {tasks.map(task => (
          <TaskCard key={task.task_id} task={task} />
        ))}

      </div>

    </div>
  );
}