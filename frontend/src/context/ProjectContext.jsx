import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import useAuth from '../hooks/useAuth'

let socket;

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
  const [teammate, setTeammate] = useState({});
  const [modalDeleteTeammate, setModalDeleteTeammate] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);

  const { auth } = useAuth()

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
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
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
      navigate("/projects");
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
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

      setAlert({});
      setModalTask(false);

      //SOCKET IO
      socket.emit("newTask", data.data);
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
      setAlert({});
      setModalTask(false);
      //socket io
      socket.emit("editTask", task);
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

      setAlert({
        msg: data.message,
        error: false,
      });
      setModalDelete(false);
      //socket io
      socket.emit("removeTask", task);

      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTeammate = async (teammate) => {
    try {
      setLoad(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        "/projects/teammates",
        { teammate },
        config
      );
      setTeammate(data.data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
    } finally {
      setLoad(false);
    }
  };

  const addTeammate = async (teammate) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/projects/teammates/${project._id}`,
        teammate,
        config
      );
      setAlert({
        msg: data.message,
        error: false,
      });
      setTeammate({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const handleModalDeleteTeammate = (teammate) => {
    setModalDeleteTeammate(!modalDeleteTeammate);
    setTeammate(teammate);
  };

  const deleteTeammate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/projects/removeteammates/${project._id}`,
        { id: teammate._id },
        config
      );
      const copy = { ...project };
      copy.teammates = copy.teammates.filter(
        (state) => state._id !== teammate._id
      );
      setAlert({
        msg: data.message,
        error: false,
      });
      setModalDeleteTeammate(false);
      setProject(projectUpdated);
      setTeammate({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(`/tasks/state/${id}`, {}, config);

      setTask({});
      setAlert({});
      //socket io
      socket.emit('changeState', data.data)
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const handleSearch = () => {
    setModalSearch(!modalSearch);
  };

  //socket io
  const submitTaskProject = (task) => {
    const projectCopy = { ...project };
    projectCopy.tasks = [...projectCopy.tasks, task];
    setProject(projectCopy);
  };

  const submitDeleteTaskProject = (task) => {
    const copy = { ...project };
    copy.tasks = copy.tasks.filter((p) => p._id !== task._id);
    setProject(copy);
  };

  const submitEditTaskProject = (task) => {
    const copy = { ...project };
    copy.tasks = copy.tasks.map((p) => (p._id === task._id ? task : p));
    console.log(copy);
    setProject(copy);
  };

  const submitChangeState = (task) => {
    const copy = { ...project };
    copy.tasks = copy.tasks.map((p) =>
      (p._id === task._id ? task : p)
    );
    setProject(copy);
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
        submitTeammate,
        teammate,
        addTeammate,
        handleModalDeleteTeammate,
        modalDeleteTeammate,
        deleteTeammate,
        completeTask,
        handleSearch,
        modalSearch,
        submitTaskProject,
        submitDeleteTaskProject,
        submitEditTaskProject,
        submitChangeState
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };

export default ProjectContext;
