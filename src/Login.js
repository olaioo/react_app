import React, { useState } from 'react'
import axios from 'axios'

const urlBase =  process.env.REACT_APP_PESSOA_SERVICE_URL

const initLogin = {name: '', password: ''}

const Login = ({setToken}) => {
    const [login, setLogin] = useState(initLogin)
    
    const loginHandler = (event) =>{
        event.preventDefault()
        console.log(login)
        axios.post(urlBase+"/login", login).then(response => {
            console.log(response)
            setToken(response.data)
            setLogin(initLogin)
            window.localStorage.setItem('token', JSON.stringify(response.data))
        }).catch(error => {
            alert('Credenciais inválidas');
        }) 
    }

    const loginNameHandler = (event) => {
        setLogin({...login, name: event.target.value})
    }

    const loginPasswordHandler = (event) => {
        setLogin({...login, password: event.target.value})
    }

    return (
        <form onSubmit={loginHandler}>
            <div>
                <label>Name: </label><input onChange={loginNameHandler}></input>
            </div>
            <div>
                <label>Password: </label><input type='password' onChange={loginPasswordHandler}></input>
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}

export default Login