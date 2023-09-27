import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const emojis = ['👾', '🤖', '🧐', '😏', '🤨']
  let [emoji, setEmoji] = useState('')

  useEffect(() => {
    const min = 0;
    const max = emojis.length - 1
    let index = Math.floor(Math.random() * +max - +min) + +min;
    setEmoji(emojis[index])
  }, [])

  const { auth } = useAuth();
  return (
    <aside className="w-full lg:w-1/5 xl:w-1/6 px-5 py-10 lg:fixed">
      <div className="text-xl font-bold dark:text-white">Hi, {auth.name}{emoji}</div>
      <Link
        to="newproject"
        className="bg-sky-600 dark:bg-indigo-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
