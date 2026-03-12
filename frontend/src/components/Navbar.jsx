import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"15px 40px",
      background:"#111827",
      color:"white",
      alignItems:"center"
    }}>

      <h2>🚀 AI Project Manager</h2>

      <div style={{display:"flex", gap:"25px"}}>

        <Link to="/" style={{color:"white"}}>Dashboard</Link>

        <Link to="/create" style={{color:"white"}}>Create Task</Link>

        <Link to="/projects" style={{color:"white"}}>Projects</Link>

        <Link to="/create-project" style={{color:"white"}}>Create Project</Link>

      </div>

    </div>
  );
}