import React, { useContext } from 'react'
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/authContext'

export const Navbar = () => {
  const {user} = useContext(AuthContext)

  
  return (
    <div className="navbar">
        <div className="nav-container">
            <Link to = "/" style={{color:"inherit", textDecoration:"none"}}>
              <span className="logo">booking</span>
            </Link>
            {user ? user.username  : (<div className="nav-container__items">
                <button className="nav-button">Register</button>
                <button className="nav-button">Login</button>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar