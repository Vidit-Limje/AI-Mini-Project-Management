import { Home, Plus, Folder } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Sidebar() {

  return (

    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="h-screen w-64 bg-black text-white p-6"
    >

      <h2 className="text-2xl font-bold mb-10">
        AI Manager
      </h2>

      <nav className="space-y-4">

        <Link to="/" className="flex items-center gap-3 hover:text-blue-400">
          <Home /> Dashboard
        </Link>

        <Link to="/create" className="flex items-center gap-3 hover:text-blue-400">
          <Plus /> Create Task
        </Link>

        <Link to="/projects" className="flex items-center gap-3 hover:text-blue-400">
          <Folder /> Projects
        </Link>

      </nav>

    </motion.div>

  );
}