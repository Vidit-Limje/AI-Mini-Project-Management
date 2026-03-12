export default function TaskCard({ task }) {

  const color =
    task.priority === "HIGH"
      ? "red"
      : task.priority === "MEDIUM"
      ? "orange"
      : "green";

  return (
    <div className="task-card">

      <h3>{task.task_title}</h3>

      <p>{task.task_description}</p>

      <div className="status">
        Status: {task.status}
      </div>

      <span className={`priority ${color}`}>
        {task.priority}
      </span>

    </div>
  );
}