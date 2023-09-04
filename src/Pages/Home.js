import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../context/userContext";
import { Navigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import TodoItem from "../components/TodoItem";
import axios from "axios";
import { toast } from "react-hot-toast";

const Home = () => {
  const { isAuth, refresh, setRefresh } = useContext(Context);
  const [tasks, setTasks] = useState([]);

  // to update task
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const ref = useRef();
  const refClose = useRef();

  const showModal = (title, desc, id) => {
    ref.current.click();
    setNewTitle(title);
    setNewDesc(desc);
    setId(id);
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/task/editTask/${id}`,
        {
          title: newTitle,
          description: newDesc,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setLoading(false);
      refClose.current.click();
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      refClose.current.click();
      setRefresh((prev) => !prev);
    }
  };

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
    <div className="container" style={{ width: "70%", margin: "auto" }}>
      <AddTask />
      <h3 className="mb-3">Your tasks</h3>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newTitle"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newDesc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newDesc"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleEdit}
                disabled={
                  newTitle.length === 0 || newDesc.length === 0 || loading
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        ></button>
      </div>
      <div>
        {!tasks.length && (
          <p>Your tasks will be shown here. Currently no task to show!</p>
        )}
        {tasks.map((t) => {
          return (
            <TodoItem
              title={t.title}
              desc={t.description}
              isCompleted={t.isCompleted}
              showModal={showModal}
              id={t._id}
              key={t._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
