import { Link } from "react-router-dom";

const PreviewProject = ({ project }) => {
  const { name, _id, client } = project;

  return (
    <div className="border-b flex p-5">
      <p className="flex-1">
        {name}
        <span className="text-sm text-gray-500 uppercase">{' '}{client}</span>
      </p>
      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${_id}`}
      >
        See project
      </Link>
    </div>
  );
};

export default PreviewProject;
