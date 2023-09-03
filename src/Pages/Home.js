import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/userContext";
import { Navigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import TodoItem from "../components/TodoItem";
import axios from "axios";

const Home = () => {
  const { isAuth, refresh } = useContext(Context);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/task/myTasks`, {
        withCredentials: true,
      })
      .then((res) => setTasks(res.data.tasks))
      .catch((e) => console.log(e));
  }, [refresh]);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div className="container" style={{width: "70%", margin: 'auto'}}>
      <AddTask />
      <h3 className="mb-3">Your tasks</h3>
      <div>
      {!tasks.length && <p>Your tasks will be shown here. Currently no task to show!</p>}
      {tasks.map((t)=>{
        return(
          <TodoItem
            title={t.title}
            desc={t.description}
            isCompleted={t.isCompleted}
            id={t._id}
            key={t._id}
          />
        )
      })}
      </div>
    </div>
  );
};

export default Home;
