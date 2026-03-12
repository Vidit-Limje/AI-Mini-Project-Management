import { useEffect,useState } from "react";
import { getProjects } from "../api/api";
import CreateProject from "../components/CreateProject";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard(){

 const [projects,setProjects]=useState([]);

 const loadProjects = () =>{
  getProjects().then(setProjects);
 };

 useEffect(()=>{
  loadProjects();
 },[]);

 return(

  <div>

   <CreateProject refresh={loadProjects}/>

   <h2>Projects</h2>

   {projects.map(p=>(
    <ProjectCard key={p.project_id} project={p}/>
   ))}

  </div>

 )

}