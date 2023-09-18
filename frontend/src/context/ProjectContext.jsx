import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alert, setAlert] = useState({});
  const [load, setLoad] = useState(false);
  const [theme, setTheme] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const _theme = localStorage.getItem("theme");
    if(_theme){
      setTheme(_theme)
    }
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clientAxios.get("/projects", config);
        setProjects(data.data);
      } catch (error) {}
    };
    getProjects();
  }, []);

  useEffect(() => {
    if(theme === 'dark'){
      document.querySelector("html").classList.add('dark')
    }
    else{
      document.querySelector("html").classList.remove('dark')
    }
  }, [theme])

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post("/projects", project, config);

      setProjects([...projects, data.data]);

      setAlert({
        msg: "Project created!!!",
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );
      const edit = projects.map((e) =>
        e._id === data.data._id ? data.data : e
      );
      setProjects(edit);
      setAlert({
        msg: "Project updated!!!",
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoad(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.get(`/projects/${id}`, config);
      setProject(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.delete(`/projects/${id}`, config);
      const deletes = projects.filter(e => e._id !== id)
      setProjects(deletes)
      setAlert({
        msg: data.data.message,
        error: false
      })
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true
      })
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        load,
        deleteProject,
        theme, 
        setTheme,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };

export default ProjectContext;
