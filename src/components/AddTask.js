import axios from "axios";
import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../context/userContext";

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const {setRefresh} = useContext(Context)

  const handleAddTask = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message); 
      setRefresh(prev => !prev)
      setLoading(false)
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    
  };

  return (
    <div className="container my-3">
      <h2 className="my-3 text-center">Add your task here!</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="container" style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={handleAddTask}
            disabled={loading}
            style={{marginTop: '10px'}}
          >
            Add task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
