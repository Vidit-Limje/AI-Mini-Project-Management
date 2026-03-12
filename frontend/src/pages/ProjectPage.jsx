import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectTasks } from "../api/api";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";

export default function ProjectPage() {

  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");

  const loadTasks = () => {
    getProjectTasks(projectId).then(setTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Search + Filter logic
  const filteredTasks = tasks.filter(task => {
    return (
      task.task_title.toLowerCase().includes(search.toLowerCase()) &&
      (priority === "" || task.priority === priority)
    );
  });

  const todo = filteredTasks.filter(t => t.status === "TODO");
  const progress = filteredTasks.filter(t => t.status === "IN_PROGRESS");
  const done = filteredTasks.filter(t => t.status === "COMPLETED");

  return (
    <div className="container">

      <h2>Project Tasks</h2>

      {/* Create Task */}
      <CreateTask projectId={projectId} refresh={loadTasks} />

      {/* Search + Filters */}
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>

        <input
          className="search-bar"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={{ marginLeft: "10px", padding: "8px" }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

      </div>

      {/* Task Board */}
      <div className="board">

        <div className="board-column">
          <h3>TODO</h3>
          {todo.map(task => (
            <TaskCard key={task.task_id} task={task} refresh={loadTasks} />
          ))}
        </div>

        <div className="board-column">
          <h3>IN PROGRESS</h3>
          {progress.map(task => (
            <TaskCard key={task.task_id} task={task} refresh={loadTasks} />
          ))}
        </div>

        <div className="board-column">
          <h3>COMPLETED</h3>
          {done.map(task => (
            <TaskCard key={task.task_id} task={task} refresh={loadTasks} />
          ))}
        </div>

      </div>

    </div>
  );
}