import { useState } from "react";
import API from "../services/api";

export default function CreateProject() {

  const [name,setName] = useState("");
  const [domain,setDomain] = useState("");

  const createProject = async () => {

    await API.post("/projects",{
      project_name:name,
      domain:domain
    });

    alert("Project created!");
  }

  return (

    <div className="container">

      <h1>Create Project</h1>

      <input
        placeholder="Project Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Domain"
        onChange={(e)=>setDomain(e.target.value)}
      />

      <button onClick={createProject}>
        Create
      </button>

    </div>

  );
}