import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();

  const { name, _id, client, createdBy } = project;

  return (
    <div className="border-b dark:border-b-slate-500 flex flex-col md:flex-row p-5 justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1 font-semibold dark:text-white">
          {name}
          <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
            {" "}
            {client}
          </span>
        </p>
        {auth._id !== createdBy && <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Teammate</p>}
      </div>
      <Link
        className="text-gray-600 dark:text-slate-200 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${_id}`}
      >
        See project
      </Link>
    </div>
  );
};

export default PreviewProject;
