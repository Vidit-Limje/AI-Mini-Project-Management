import { Link } from "react-router-dom";

export default function ProjectCard({project}){

 return(

  <div className="project-card">

   <h3>{project.project_name}</h3>

   <p>{project.domain}</p>

   <Link to={`/project/${project.project_id}`}>
    Open Project
   </Link>

  </div>

 )

}