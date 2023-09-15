import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const Resetpassword = () => {
  const [tokenValid, setTokenValid] = useState(false);
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const url = `/users/forgotpassword/${id}`;
        const { data } = await clientAxios(url);
        setTokenValid(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.message,
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      setAlert({
        msg: "Password is required",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: "Your password needs at least 6 characters",
        error: true,
      });
      return;
    }
    try {
      const url = `/users/forgotpassword/${id}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({
        msg: data.message,
        error: false,
      });
      setPasswordModified(true);
      setPassword("");
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 dark:text-indigo-600 font-black text-6xl">
        Reset your{" "}
        <span className="text-slate-700 dark:text-slate-50">password</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {tokenValid && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white dark:bg-gray-800 shadow rounded-lg px-10 py-5"
        >
          <div className="my-5">
            <label
              className="text-gray-600 dark:text-white uppercase block text-xl font-bold"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full mt-3 p-3 border dark:border-[0px] rounded-xl bg-gray-50 dark:bg-slate-700 dark:text-white"
              placeholder="******"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            value="New password"
            className="bg-sky-700 dark:bg-indigo-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 dark:hover:bg-indigo-800 transition-all"
          />
        </form>
      )}
      {passwordModified && (
        <Link
          className="block text-center my-5 text-slate-500 text-sm uppercase"
          to="/"
        >
          Log In
        </Link>
      )}
    </>
  );
};

export default Resetpassword;
