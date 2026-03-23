import React,{useState}from 'react'
import "../style/login.scss"
import FormGroup from '../component/Formgroup'
import { Link } from 'react-router'
import {useAuth} from "../hooks/useAuth"
import { useNavigate } from 'react-router'


const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")

const { handelLogin }= useAuth()
const navigate = useNavigate()



async function handleSubmit(e){
     e.preventDefault()
      await handelLogin({email,password})
      navigate("/")
}

  return (
    <main className='login-page'>
      <div className="form-container">

        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

          <FormGroup 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          label="email" placeholder="Email password" />

          <FormGroup
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
           label="password" placeholder="Enter password" />

          
          <button className='button' type='submit'>Login</button>
        </form>
        <p>Don't have an Account?<Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login