import { formatDate } from "../helpers/formatDate";
import useProject from "../hooks/useProjects";

const Task = ({ task }) => {
  const { name, description, deadline, priority, state, _id } = task;
  const { handleModalEditTask, handleModalDeleteTask } = useProject()

  return (
    <div className="border-b dark:border-slate-600 p-5 flex justify-between items-center">
      <div>
        <p className="dark:text-white mb-1 text-xl">{name}</p>
        <p className="dark:text-gray-200 mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="dark:text-white mb-1 text-sm">{formatDate(deadline.split('T')[0].split('-'))}</p>
        <p className="dark:text-gray-200 mb-1 text-gray-600">Priority: {priority}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => handleModalEditTask(task)} className="bg-amber-300 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg">
          Edit
        </button>
        {state ? (
          <button className="bg-sky-600 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg">
          Complete
        </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg">
          Incomplete
        </button>
        )}
        <button onClick={() => handleModalDeleteTask(task)} className="bg-red-600 px-4 py-3 text-white font-bold uppercase text-sm rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
