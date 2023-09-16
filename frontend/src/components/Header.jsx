import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white dark:bg-zinc-900 border-b dark:border-black">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 dark:text-indigo-600 font-black text-center">
          Project Manager
        </h2>
        <input
          type="search"
          placeholder="Search project"
          className="rounded-lg lg:w-96 block p-2 border dark:border-black dark:text-white dark:bg-gray-500"
        />
        <div className="flex items-center gap-4">
          <Link className="font-bold uppercase dark:text-white" to="/projects">
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 dark:bg-indigo-600 p-3 rounded-md uppercase font-bold"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
