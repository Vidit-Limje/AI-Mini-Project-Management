import { Link } from "react-router-dom";

export default function Navbar(){

 return(
  <div className="navbar">

   <h2>AI Task Manager</h2>

   <Link to="/">Dashboard</Link>

  </div>
 )

}