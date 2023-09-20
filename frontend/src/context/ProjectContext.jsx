import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [alert, setAlert] = useState({});
  const [load, setLoad] = useState(false);
  const [theme, setTheme] = useState("");
  const [modalTask, setModalTask] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const _theme = localStorage.getItem("theme");
    if (_theme) {
      setTheme(_theme);
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token");
      return;
    }
    const getProjects = async () => {
      try {
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
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

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
      const deletes = projects.filter((e) => e._id !== id);
      setProjects(deletes);
      setAlert({
        msg: data.data.message,
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

  const handleModalTask = () => {
    setModalTask(!modalTask);
    setTask({});
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post("/tasks", task, config);
      const projectCopy = { ...project };
      projectCopy.tasks = [...project.tasks, data.data];
      setProject(projectCopy);
      setAlert({});
      setModalTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);
      const copy = { ...project };
      copy.tasks = copy.tasks.map((p) =>
        p._id === data.data._id ? data.data : p
      );
      setProject(copy);
      setAlert({});
      setModalTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const logout = () => {
    setProject({});
    setProjects([]);
    localStorage.clear();
    navigate("/");
  };

  const handleModalEditTask = async (task) => {
    setTask(task);
    setModalTask(true);
  };

  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDelete(!modalDelete);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
      const copy = { ...project };
      copy.tasks = copy.tasks.filter(p => p._id !== task._id)
      setAlert({
        msg: data.message,
        error: false
      });
      setProject(copy);
      setModalDelete(false);
      setTask({})
      setTimeout(() => {
        setAlert({})
      }, 3000);
    } catch (error) {
      console.log(error);
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
        handleModalTask,
        modalTask,
        submitTask,
        logout,
        handleModalEditTask,
        task,
        handleModalDeleteTask,
        modalDelete,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };

export default ProjectContext;
