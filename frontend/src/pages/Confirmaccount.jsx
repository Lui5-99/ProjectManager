import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const Confirmaccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clientAxios.get(url);
        setAlert({
          msg: data.message,
          error: false,
        });
        setAccountConfirmed(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.message,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 dark:text-indigo-600 font-black text-6xl">
        Confirm your account and start to manage your{" "}
        <span className="text-slate-700 dark:text-slate-50">projects</span>
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white dark:bg-gray-800">
        {msg && <Alert alert={alert} />}
        {accountConfirmed && (
          <Link
            className="block text-center my-5 text-slate-500 dark:text-white text-sm uppercase"
            to="/"
          >
            Log In
          </Link>
        )}
      </div>
    </>
  );
};

export default Confirmaccount;
