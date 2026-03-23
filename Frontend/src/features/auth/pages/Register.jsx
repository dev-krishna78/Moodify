import React,{useState}from 'react'
import FormGroup from '../component/Formgroup'
import "../style/register.scss"
import {Link} from "react-router"
import {useAuth} from "../hooks/useAuth"
import { useNavigate } from 'react-router'

const Register = () => {

  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const { handelRegister} = useAuth()
  const navigate = useNavigate()

async function handelSubmit(e){
   e.preventDefault()
   await handelRegister({username,email, password})
   navigate("/")

}

  return (
    <main className='login-page'>
      <div className="form-container">
        <h1>Register</h1>
         <form onSubmit={handelSubmit}>

          <FormGroup
          value={username} 
           onChange={(e)=>setUsername(e.target.value)}
           label="username" placeholder="enter username"/>

          <FormGroup
          value={email} 
           onChange={(e)=>setEmail(e.target.value)}
           label="email" placeholder="enter email"/>

          <FormGroup
          value={password} 
           onChange={(e)=>setPassword(e.target.value )}
           label="password" placeholder="enter password"/>

          <button className='button' 
           type='submit'>Submit</button>
         </form>
         
   <p>Already have an Account?<Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register