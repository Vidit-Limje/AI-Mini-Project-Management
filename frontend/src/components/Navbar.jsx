import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="navbar">

  <div className="logo">
    AI Task Manager
  </div>

  <div className="nav-links">
    <Link to="/">Dashboard</Link>
  </div>

</nav>
  );

}