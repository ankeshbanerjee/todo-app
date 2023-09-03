import React, { useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Context } from "../context/userContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  let location = useLocation();
  const { isAuth, setIsAuth } = useContext(Context);

  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuth(false);
      })
      .catch((e) => {
        setIsAuth(false);
        toast.error(e.response.data.message);
        setIsAuth(true);
      });
  };

  if (!isAuth) return Navigate("/login");

  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TODO-APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "acitve" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/profile" ? "acitve" : ""
                }`}
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </ul>
          {isAuth && (
            <button
              type="button"
              className="btn btn-light"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
