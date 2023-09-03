import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../context/userContext";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, setIsAuth } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/user/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuth(false);
      setLoading(false);
    }
  };

  if (isAuth) return <Navigate to="/" />;

  
  return (
    <div className="container my-3" style={{width: "70%", margin: 'auto'}}>
    <h2 className="my-3 text-center">Register to TODO-APP!</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="container" style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={handleSignup}
            disabled={loading}
          >
            Sign Up
          </button>
          <div className="my-3">
            <span>Already have an account?&nbsp;</span>
            <Link to="/login">Login here</Link> <span> </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
