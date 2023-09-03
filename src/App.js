import React, { useEffect, useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import  { Toaster } from 'react-hot-toast'
import { Context } from './context/userContext';
import axios from 'axios';
import Loading from './components/Loading';

const App = () => {
  const {setIsAuth, setUser} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/user/me`,{
      withCredentials: true
    }).then(res => {
      setUser(res.data.user)
      setIsAuth(true)
      setLoading(false)
    }).catch(error=>{
      console.log(error.response.data.message)
      setUser({})
      setIsAuth(false)
      setLoading(false)
    })
    //eslint-disable-next-line
  }, [])

  if(loading)
    return <Loading/>
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App

