import { useEffect } from "react"
import Formteammate from "../components/Formteammate"
import useProject from "../hooks/useProjects"
import { useParams } from "react-router-dom"
import LoadCards from "../components/LoadCards"
import Alert from "../components/Alert"

const Newteammate = () => {

  const { getProject, project, load, teammate, addTeammate, alert } = useProject()
  const params = useParams()
  useEffect(() => {
    getProject(params.id)
  }, [])

  if(!project?._id) return <Alert alert={alert} />

  return (
    <>
      <h1 className="text-4xl font-black dark:text-white">Add Teammate to project: {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <Formteammate />
      </div>
      {load ? <LoadCards /> : teammate?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white dark:bg-zinc-900 py-10 px-5 w-full md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-2xl font-bold dark:text-white">Result:</h2>
            <div className="flex justify-between items-center dark:text-white">
              <p>{teammate.name}</p>
              <button
                type="button"
                className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold"
                onClick={() => addTeammate({
                  email: teammate.email
                })}
              >Add to project</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Newteammate