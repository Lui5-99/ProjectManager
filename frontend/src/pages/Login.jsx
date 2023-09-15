import { useState } from "react";  
import { Link, useNavigate } from "react-router-dom";
import Alert from '../components/Alert'
import clientAxios from "../config/clientAxios";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([email, password].includes('')){
      setAlert({
        msg: "All fields are required",
        error: true,
      })
      return
    }
    try {
      const { data } = await clientAxios.post('/users/login', {
        email, 
        password
      })
      localStorage.setItem('token', data.data.token)
      setAlert({
        msg: data.message,
        error: false,
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 dark:text-indigo-600 font-black text-6xl">
        Log in to manage your{" "}
        <span className="text-slate-700 dark:text-slate-50">projets</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form onSubmit={handleSubmit} className="my-10 bg-white dark:bg-gray-800 shadow rounded-lg px-10 py-5">
        <div className="my-5">
          <label
            className="text-gray-600 dark:text-white uppercase block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border dark:border-[0px] rounded-xl bg-gray-50 dark:bg-slate-700 dark:text-white"
            placeholder="example@mail.com"
            value={email}
            onChange={e => {setEmail(e.target.value)}}
          />
        </div>
        <div className="my-5">
          <label
            className="text-gray-600 dark:text-white uppercase block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border dark:border-[0px] rounded-xl bg-gray-50 dark:bg-slate-700 dark:text-white"
            placeholder="******"
            value={password}
            onChange={e => {setPassword(e.target.value)}}
          />
        </div>
        <input
          type="submit"
          value="Log in"
          className="bg-sky-700 dark:bg-indigo-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 dark:hover:bg-indigo-800 transition-all"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
         className="block text-center my-5 text-slate-500 text-sm"
          to="signup"
        >
          You don't have account yet? Sing Up
        </Link>
        <Link
         className="block text-center my-5 text-slate-500 text-sm"
          to="/forgotpassword"
        >
          Forgot my password
        </Link>
      </nav>
    </>
  );
};

export default Login;
