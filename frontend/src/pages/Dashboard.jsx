import { useEffect,useState } from "react";
import { getProjects } from "../api/api";
import CreateProject from "../components/CreateProject";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard(){

 const [projects,setProjects]=useState([]);
 const [search,setSearch]=useState("");

 const loadProjects = () =>{
  getProjects().then(setProjects);
 };

 useEffect(()=>{
  loadProjects();
 },[]);

 const filteredProjects = projects.filter(p =>
   p.project_name.toLowerCase().includes(search.toLowerCase())
 );

 return(

  <div className="container">

   <CreateProject refresh={loadProjects}/>

   <h2>Projects</h2>

   <input
    className="search-bar"
    placeholder="Search project..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
   />

   {filteredProjects.map(p=>(
    <ProjectCard key={p.project_id} project={p}/>
   ))}

  </div>

 )

}