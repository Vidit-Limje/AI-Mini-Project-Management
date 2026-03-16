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

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const loadComments = async () => {
    const data = await getComments(task.task_id);
    setComments(data);
  };

  const toggleExpand = () => {

    if (!expanded) {
      loadComments();
    }

    setExpanded(!expanded);
  };

  const changeStatus = async (status) => {
    await updateTask(task.task_id, { status });
    refresh();
  };

  const assignUser = async (userId) => {
    if (!userId) return;

    await updateTask(task.task_id, {
      assignee_id: userId
    });

    refresh();
  };

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

      {/* COLLAPSED VIEW */}

      <div className="task-summary" onClick={toggleExpand}>

        <h4 className="task-title">
          {task.task_title}
        </h4>

        <div className="task-meta">

          <span className="task-priority">
            {task.priority}
          </span>

          <span className="task-assignee">
            {assignedUser ? assignedUser.name : "Unassigned"}
          </span>

        </div>

      </div>

      {/* EXPANDED DETAILS */}

      {expanded && (

        <div className="task-details">

          <p className="task-description">
            {task.task_description}
          </p>

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

          {/* STATUS */}

          <div className="status-buttons">

  {task.status !== "TODO" && (
    <button onClick={() => changeStatus("TODO")}>
      TODO
    </button>
  )}

  {task.status !== "IN_PROGRESS" && (
    <button onClick={() => changeStatus("IN_PROGRESS")}>
      IN PROGRESS
    </button>
  )}

  {task.status !== "COMPLETED" && (
    <button onClick={() => changeStatus("COMPLETED")}>
      DONE
    </button>
  )}

</div>

          {/* COMMENTS */}

          <div className="comments-section">

            <div className="comments-header">
              Comments
            </div>

            {comments.length === 0 && (
              <p className="no-comments">No comments yet</p>
            )}

            {comments.map((c) => {

              const commentUserObj = users.find(
                u => u.user_id === c.user_id
              );

              const username = commentUserObj
                ? commentUserObj.name
                : "User";

              const avatar = username.charAt(0).toUpperCase();

              return (
                <div key={c.comment_id} className="comment-row">

                  <div className="comment-avatar">
                    {avatar}
                  </div>

                  <div className="comment-body">

                    <div className="comment-top">

                      <span className="comment-name">
                        {username}
                      </span>

                      <button
                        className="comment-delete"
                        onClick={() =>
                          deleteComment(c.comment_id).then(loadComments)
                        }
                      >
                        ✕
                      </button>

                    </div>

                    <div className="comment-text">
                      {c.comment_text}
                    </div>

                  </div>

                </div>
              );
            })}

            {/* COMMENT INPUT */}

            <div className="comment-input-box">

              <select
                value={commentUser}
                onChange={(e) => setCommentUser(e.target.value)}
              >
                <option value="">User</option>

                {users.map((user) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.name}
                  </option>
                ))}

              </select>

              <input
                placeholder="Write comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <button onClick={addComment}>
                Post
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}