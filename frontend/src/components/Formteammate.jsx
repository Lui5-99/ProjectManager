import { useState } from "react";
import useProject from "../hooks/useProjects";
import Alert from "./Alert";

const Formteammate = () => {
  const [teammate, setTeammate] = useState("");
  const { alert, showAlert, submitTeammate } = useProject()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(teammate === ''){
      alert({
        msg: 'Email is required',
        error: true,
      })
      return
    }
    await submitTeammate(teammate)
    setTeammate("")
  };

  const { msg } = alert

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          className="text-gray-700 dark:text-white uppercase font-bold text-sm"
          htmlFor="email"
        >
          Email teammate
        </label>
        <input
          id="task"
          type="email"
          placeholder="Email teammate"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md dark:border-white dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
          value={teammate}
          onChange={(e) => {
            setTeammate(e.target.value);
          }}
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
        value="Search teammate"
      />
    </form>
  );
};

export default Formteammate;
