import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RouteProtect = () => {
  const { auth, load } = useAuth();
  if (load) return "Loading...";

  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100 dark:bg-zinc-700">
          <Header />
          <div className="flex flex-col lg:flex-row md:min-h-screen mt-64 md:mt-14">
            <Sidebar />
            <main className="p-10 flex-1 ml-0 lg:ml-80 w-full">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RouteProtect;
