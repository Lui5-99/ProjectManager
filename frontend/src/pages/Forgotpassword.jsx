import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";
import clientAxios from "../config/clientAxios";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlert({
        msg: "Email is required",
        error: true,
      });
      return;
    }
    try {
      const url = `/users/forgotpassword`
      const { data } = await clientAxios.post(url, {email})
      setAlert({
        msg: data.message,
        error: false
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true
      })
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 dark:text-indigo-600 font-black text-6xl">
        Reset you password, so don't lose your{" "}
        <span className="text-slate-700 dark:text-slate-50">projets</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white dark:bg-gray-800 shadow rounded-lg px-10 py-5"
      >
        <div className="my-5">
          <label
            className="text-gray-600 dark:text-white uppercase block text-xl font-bold"
            htmlFor="email"
          >
            email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border dark:border-[0px] rounded-xl bg-gray-50 dark:bg-slate-700 dark:text-white"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <input
          type="submit"
          value="Send mail"
          className="bg-sky-700 dark:bg-indigo-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 dark:hover:bg-indigo-800 transition-all"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 text-sm" to="/">
          Do you already have an account? Log In
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="signup"
        >
          You don't have account yet? Sing Up
        </Link>
      </nav>
    </>
  );
};

export default Forgotpassword;
