import React, {useContext} from 'react'
import { Context } from '../context/userContext'
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const {isAuth, user} = useContext(Context);

  if (!isAuth)
    return <Navigate to="/login"/>
  return (
    <div className="container my-3 text-center">
      <h1>Hello! {user.name}</h1>
      <h2>Your registered email id is : {user.email}</h2>
    </div>
  )
}

export default Profile
