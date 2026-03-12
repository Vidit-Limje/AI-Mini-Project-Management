import { useEffect, useState } from "react";
import API from "../services/api";

export default function KanbanBoard() {

  const [board, setBoard] = useState({});

  useEffect(() => {
    API.get("/tasks/board").then(res => {
      setBoard(res.data);
    });
  }, []);

  return (

    <div className="board">

      <div>
        <h2>TODO</h2>
        {board.TODO?.map(t => <p>{t.task_title}</p>)}
      </div>

      <div>
        <h2>IN PROGRESS</h2>
        {board.IN_PROGRESS?.map(t => <p>{t.task_title}</p>)}
      </div>

      <div>
        <h2>DONE</h2>
        {board.DONE?.map(t => <p>{t.task_title}</p>)}
      </div>

    </div>
  );
}