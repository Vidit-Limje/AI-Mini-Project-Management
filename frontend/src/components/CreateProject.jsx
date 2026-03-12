import { useState } from "react";
import { createProject } from "../api/api";

export default function CreateProject({refresh}){

 const [name,setName]=useState("");
 const [domain,setDomain]=useState("");

 const submit = async () => {

  await createProject({
   project_name:name,
   domain:domain
  });

  setName("");
  setDomain("");

  refresh();
 };

 return(

  <div>

   <h3>Create Project</h3>

   <input
    placeholder="Project Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
   />

   <input
    placeholder="Domain"
    value={domain}
    onChange={(e)=>setDomain(e.target.value)}
   />

   <button onClick={submit}>
    Create
   </button>

  </div>
 )

}