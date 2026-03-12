import { useState } from "react";
import { createTask } from "../api/api";

export default function CreateTask({projectId,refresh}){

 const [title,setTitle]=useState("");

 const submit = async () => {

  await createTask({
   project_id:projectId,
   task_title:title,
   assignee_id:null
  });

  setTitle("");
  refresh();

 };

 return(

  <div>

   <input
    placeholder="Task title"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
   />

   <button onClick={submit}>
    Add Task
   </button>

  </div>

 )

}