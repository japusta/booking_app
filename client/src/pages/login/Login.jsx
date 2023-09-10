import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import "./login.css"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })
    const {loading, error, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]:e.target.value}))
    }

    const handleLogin =async e => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try{
            const res =await axios.post("/auth/login", credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            navigate("/")
        }
        catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
        }
    }



    return (
        <div className='login'>
            <div className="login-container">
                <input type="text" placeholder='username' id='username' onChange={handleChange} className="login-container__input" />
                <input type="password" placeholder='password' id='password' onChange={handleChange} className="login-container__input" />
                <button disabled={loading} onClick={handleLogin} className="login-container__button">
                    Login
                </button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login