import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then(res => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div>

      <h1>Dashboard</h1>

      {tasks.map(task => (
        <TaskCard key={task.task_id} task={task} />
      ))}

    </div>
  );
}