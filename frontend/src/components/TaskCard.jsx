import { updateTask } from "../api/api";

export default function TaskCard({task,refresh}){

 const changeStatus = async(status)=>{

  await updateTask(task.task_id,{
   status:status
  });

  refresh();
 };

 return(

  <div className="task-card">

   <h4>{task.task_title}</h4>

   <p>{task.task_description}</p>

   <p>Priority: {task.priority}</p>

   <button onClick={()=>changeStatus("TODO")}>TODO</button>
   <button onClick={()=>changeStatus("IN_PROGRESS")}>IN PROGRESS</button>
   <button onClick={()=>changeStatus("COMPLETED")}>DONE</button>

  </div>

 )

}