import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import useProject from "../hooks/useProjects";
import Search from "./Search";

const Header = () => {
  const { logout, handleSearch } = useProject();

  return (
    <header className="px-4 py-5 bg-white dark:bg-zinc-900 border-b dark:border-black fixed top-0 w-full">
      <div className="md:flex md:justify-between">
        <Link to="/projects">
          <h2 className="text-4xl text-sky-600 dark:text-indigo-600 font-black text-center mb-5 md:mb-0">
            Project Manager
          </h2>
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={handleSearch}
            type="button"
            className="font-bold uppercase dark:text-white"
          >
            Search project
          </button>
          <Theme />
          <Link className="font-bold uppercase dark:text-white" to="/projects">
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 hover:bg-sky-800 dark:bg-indigo-600 dark:hover:bg-indigo-800 p-3 rounded-md uppercase font-bold transition-all"
            onClick={logout}
          >
            Log Out
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
