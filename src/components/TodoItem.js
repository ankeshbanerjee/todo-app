import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../context/userContext";

const TodoItem = (props) => {
  const [loading, setLoading] = useState(false);
  const { title, desc, isCompleted, id, showModal } = props;
  const { setRefresh } = useContext(Context);
  
  const updateTask = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_SERVER}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setRefresh((prev) => !prev);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const deleteTask = async () => {
    setLoading(true);
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER}/task/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="container mb-3">
      <div className="card">
        <div className="card-body">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 className="card-title">{title}</h5>
            <span
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                marginBottom: "9px",
              }}
              onClick={()=>showModal(title, desc, id)}
            >
              <i className="fa-solid fa-pen-to-square fa-lg"></i>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <p className="card-text">{desc}</p>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className="form-check"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked={isCompleted}
                  onChange={() => updateTask(id)}
                  disabled={loading}
                  style={{ height: "23px", width: "23px" }}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  &nbsp;&nbsp;{isCompleted ? "Completed" : "Pending"}
                </label>
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ marginLeft: "20px" }}
                  onClick={() => deleteTask(id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
