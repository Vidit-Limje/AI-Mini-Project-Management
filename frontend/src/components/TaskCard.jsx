import { useEffect, useState } from "react";
import {
  updateTask,
  getUsers,
  getComments,
  createComment,
  deleteComment
} from "../api/api";

export default function TaskCard({ task, refresh }) {

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentUser, setCommentUser] = useState("");

  useEffect(() => {
    loadUsers();
    loadComments();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const loadComments = async () => {
    const data = await getComments(task.task_id);
    setComments(data);
  };

  // Change task status
  const changeStatus = async (status) => {
    await updateTask(task.task_id, { status });
    refresh();
  };

  // Assign user
  const assignUser = async (userId) => {
    if (!userId) return;

    await updateTask(task.task_id, {
      assignee_id: userId
    });

    refresh();
  };

  // Add comment
  const addComment = async () => {

    if (!commentUser) {
      alert("Select a user first");
      return;
    }

    if (commentText.trim() === "") return;

    await createComment({
  task_id: String(task.task_id),
  user_id: String(commentUser),
  comment_text: commentText
});

    setCommentText("");
setCommentUser("");
loadComments();
  };

  const assignedUser = users.find(
    (u) => u.user_id === task.assignee_id
  );

  return (
    <div className="task-card">

      <h4>{task.task_title}</h4>

      <p>{task.task_description}</p>

      <p>
        <b>Priority:</b> {task.priority}
      </p>

      {/* ASSIGNED USER */}
      <p>
        <b>Assigned To:</b>{" "}
        {assignedUser ? assignedUser.name : "Unassigned"}
      </p>

      {/* ASSIGN USER */}
      {!task.assignee_id && (
        <select onChange={(e) => assignUser(e.target.value)}>
          <option value="">Assign User</option>

          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.name}
            </option>
          ))}
        </select>
      )}

      {/* STATUS BUTTONS */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => changeStatus("TODO")}>TODO</button>
        <button onClick={() => changeStatus("IN_PROGRESS")}>IN PROGRESS</button>
        <button onClick={() => changeStatus("COMPLETED")}>DONE</button>
      </div>

      {/* COMMENTS */}
      <div style={{ marginTop: "15px" }}>

        <b>Comments</b>

        {comments.length === 0 && (
          <p style={{ fontSize: "12px" }}>No comments yet</p>
        )}

        {comments.map((c) => {

          const commentUserObj = users.find(
            u => u.user_id === c.user_id
          );

          return (
            <div key={c.comment_id} style={{ marginTop: "6px" }}>

              <b>{commentUserObj ? commentUserObj.name : "User"}:</b>{" "}
              {c.comment_text}

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteComment(c.comment_id).then(loadComments)}
              >
                x
              </button>

            </div>
          );
        })}

        {/* ADD COMMENT */}
        <div style={{ marginTop: "10px" }}>

          <select
            value={commentUser}
            onChange={(e) => setCommentUser(e.target.value)}
          >
            <option value="">Select User</option>

            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Add comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ marginLeft: "5px" }}
          />

          <button
            onClick={addComment}
            style={{ marginLeft: "5px" }}
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
}