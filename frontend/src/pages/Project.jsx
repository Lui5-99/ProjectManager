import { useParams, Link } from "react-router-dom";
import useProject from "../hooks/useProjects";
import { useEffect } from "react";
import LoadCards from "../components/LoadCards";

const Project = () => {
  const params = useParams();

  const { getProject, project, load } = useProject();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  if (load) return <LoadCards />;

  return (
    <div className="flex justify-between">
      <h1 className="font-black text-4xl dark:text-white">{name}</h1>
      <div className="flex items-center gap-2 text-gray-400 dark:hover:text-white hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>

        <Link
          to={`/projects/edit/${params.id}`}
          className="uppercase font-bold"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Project;
