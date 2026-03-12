import { useEffect, useState } from "react";
import { updateTask, getUsers } from "../api/api";

export default function TaskCard({ task, refresh }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const changeStatus = async (status) => {
    await updateTask(task.task_id, { status: status });
    refresh();
  };

  const assignUser = async (userId) => {
    await updateTask(task.task_id, {
      assignee_id: userId
    });

    refresh();
  };

  const assignedUser = users.find(
    u => u.user_id === task.assignee_id
  );

  return (
    <div className="task-card">

      <h4>{task.task_title}</h4>

      <p>{task.task_description}</p>

      <p><b>Priority:</b> {task.priority}</p>

      {/* ASSIGNEE DISPLAY */}
      <p>
        <b>Assigned To:</b>{" "}
        {assignedUser ? assignedUser.name : "Unassigned"}
      </p>

      {/* ASSIGN USER */}
      {!task.assignee_id && (
        <select onChange={(e) => assignUser(e.target.value)}>

          <option value="">Assign User</option>

          {users.map(user => (
            <option key={user.user_id} value={user.user_id}>
              {user.name}
            </option>
          ))}

        </select>
      )}

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => changeStatus("TODO")}>TODO</button>
        <button onClick={() => changeStatus("IN_PROGRESS")}>IN PROGRESS</button>
        <button onClick={() => changeStatus("COMPLETED")}>DONE</button>
      </div>

    </div>
  );
}