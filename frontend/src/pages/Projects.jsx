import PreviewProject from "../components/PreviewProject";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();

  return (
    <>
      <h1 className="text-4xl font-black dark:text-white">Projects</h1>
      <div className="bg-white dark:bg-zinc-900 shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 dark:text-white uppercase p-5">
            Dont have projects yet
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
