import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";

import Navbar from "./components/Navbar";

export default function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/create" element={<CreateTask />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/create-project" element={<CreateProject />} />

      </Routes>

    </BrowserRouter>
  );
}