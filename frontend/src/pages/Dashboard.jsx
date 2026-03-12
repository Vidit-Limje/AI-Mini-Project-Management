import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import { motion } from "framer-motion";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then(res => setTasks(res.data));
  }, []);

  return (

    <div className="container">

  <h1>🚀 AI Project Dashboard</h1>

  <div className="board">

    {tasks.map(task => (
      <TaskCard key={task.task_id} task={task} />
    ))}

  </div>

</div>

  );
}