import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { getProjectTasks } from "../api/api";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";

export default function ProjectPage(){

 const {projectId}=useParams();

 const [tasks,setTasks]=useState([]);

 const loadTasks = () =>{
  getProjectTasks(projectId).then(setTasks);
 };

 useEffect(()=>{
  loadTasks();
 },[]);

 const todo = tasks.filter(t=>t.status==="TODO");
 const progress = tasks.filter(t=>t.status==="IN_PROGRESS");
 const done = tasks.filter(t=>t.status==="COMPLETED");

 return(

  <div>

   <CreateTask projectId={projectId} refresh={loadTasks}/>

   <div className="board">

    <div>
     <h3>TODO</h3>
     {todo.map(t=>
      <TaskCard key={t.task_id} task={t} refresh={loadTasks}/>
     )}
    </div>

    <div>
     <h3>IN PROGRESS</h3>
     {progress.map(t=>
      <TaskCard key={t.task_id} task={t} refresh={loadTasks}/>
     )}
    </div>

    <div>
     <h3>COMPLETED</h3>
     {done.map(t=>
      <TaskCard key={t.task_id} task={t} refresh={loadTasks}/>
     )}
    </div>

   </div>

  </div>

 )

}