import useProject from "../hooks/useProjects";
import useAuth from '../hooks/useAuth'

const useAdmin = () => {
  const { project } = useProject()
  const { auth } = useAuth()

  return project.createdBy === auth._id
}

export default useAdmin