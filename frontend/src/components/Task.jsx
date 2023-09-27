import { formatDate } from "../helpers/formatDate";
import useAdmin from "../hooks/useAdmin";
import useProject from "../hooks/useProjects";

const Task = ({ task }) => {
  const { name, description, deadline, priority, state, _id } = task;
  const { handleModalEditTask, handleModalDeleteTask, completeTask } =
    useProject();
  const isAdmin = useAdmin();

  return (
    <div className="border-b dark:border-slate-600 p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="dark:text-white mb-1 text-xl">{name}</p>
        <p className="dark:text-gray-200 mb-1 text-sm text-gray-500 uppercase">
          {description}
        </p>
        <p className="dark:text-white mb-1 text-sm">
          {formatDate(deadline.split("T")[0].split("-"))}
        </p>
        <p className="dark:text-gray-200 mb-1 text-gray-600">
          Priority: {priority}
        </p>
        {state && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Complete by: {task.complete.name}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {isAdmin && (
          <button
            onClick={() => handleModalEditTask(task)}
            className="bg-amber-300 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => completeTask(_id)}
          className={`${
            state ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white font-bold uppercase text-sm rounded-lg`}
        >
          {state ? "Complete" : "Incomplete"}
        </button>
        {isAdmin && (
          <button
            onClick={() => handleModalDeleteTask(task)}
            className="bg-red-600 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
