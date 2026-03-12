import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import Projects from "./pages/Projects";

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/create" element={<CreateTask />} />

        <Route path="/projects" element={<Projects />} />

      </Routes>

    </BrowserRouter>
  );
}