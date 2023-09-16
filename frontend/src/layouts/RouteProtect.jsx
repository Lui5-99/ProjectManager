import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RouteProtect = () => {

  const { auth, load } = useAuth()
  if(load) return 'Loading...'

  return (
    <>
       {auth._id ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export default RouteProtect