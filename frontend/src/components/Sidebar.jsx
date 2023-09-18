import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <div className="text-xl font-bold dark:text-white">Hola, {auth.name}</div>
      <Link
        to="newproject"
        className="bg-sky-600 hover:bg-sky-800 dark:bg-indigo-600 hover:dark:bg-indigo-800 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg transition-all"
      >
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
