import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuth, setIsAuth} = useContext(Context);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}/user/login`, {
        email,
        password,
      }, {
        withCredentials: true
      })
      .then((result) => {
        toast.success(result.data.message);
        setIsAuth(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsAuth(false);
        setLoading(false);
      });
  };

  if (isAuth) return <Navigate to="/"/>

  return (
    <div className="container my-3" style={{width: "70%", margin: 'auto'}}>
    <h2 className="my-3 text-center">Login to TODO-APP!</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="container" style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-dark" onClick={handleLogin} disabled={loading}>
            Login
          </button>
          <div className="my-3">
            <span>New to TODO-APP?&nbsp;</span>
            <Link to="/register">Sign up here</Link> <span> </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
