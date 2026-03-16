import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import ProjectPage from "./pages/ProjectPage"
import "./styles/global.css"
function App(){

 return(

  <BrowserRouter>

   <Navbar/>

   <Routes>

    <Route path="/" element={<Dashboard/>} />

    <Route path="/project/:projectId" element={<ProjectPage/>} />

   </Routes>

  </BrowserRouter>

 )

}

export default App