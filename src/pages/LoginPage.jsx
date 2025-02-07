import React, { useContext, useLayoutEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { base_url } from "../../utils";
import PropagateLoader from "react-spinners/PropagateLoader";

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [state, setSatate] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const inputHandle = (e) => {
    setSatate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch(`${base_url}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("user_token", data.token);
        window.location.assign("/");
      }
    } catch (e) {
      setError(e?.message);
      console.log(e);
    }
    setLoader(false);
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#F8F7FA] flex justify-center items-center">
      <div className="w-[370px] text-[#2f2b3dc7] relative h-[420px]">
        <div className="w-[200px] h-[200px] absolute bg-gray-100 rounded-md -top-[45px] -left-[45px] z-0"></div>
        <div className="bg-[#fff] h-full card_shadow px-7 py-8 rounded-md absolute z-20">
          <div className="w-full justify-center items-center flex gap-3">
            <h2 className="text-2xl font-bold">DOCS Maker</h2>
          </div>

          <p className="text-sm text-center mt-2 mb-4">
            Please sign-in to your account and start the adventure
          </p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md  focus:border-indigo-500 overflow-hidden"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-5">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md  focus:border-indigo-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              />
            </div>
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center justify-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#7367f0] bg-gray-100 border-gray-300 rounded focus:ring-[#7367f0] "
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium  "
                >
                  Remember Me
                </label>
              </div>
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-[#4285F4] w-full hover:bg-[#3b7de8] hover:shadow-lg text-white rounded-md px-7 py-[4px] text-md mt-2 flex items-center justify-center"
            >
              {loader ? (
                <PropagateLoader color="#fff" className="h-6 w-6 mt-2" />
              ) : (
                "Login"
              )}
            </button>
            <div className="pt-4 pb-8">
              Don't Have an account?
              <Link to="/register" className="text-[#7367f0] text-sm">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
