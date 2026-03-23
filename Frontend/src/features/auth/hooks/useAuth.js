import { login , register , getMe , logout } from "../services/auth.api"
import { useContext } from "react"
import { AuthContext } from "../auth.context"

export const useAuth = () =>{

   const context = useContext(AuthContext);

   const {user , setUser , loading , setLoading } = context

   async function handelRegister({username, email, password}){
     
      setLoading(true)
      const data = await register(username, email, password);
      setUser(data.user)
      setLoading(false)
   }

   async function handelLogin({username,email, password}){

     setLoading(true)
    const data = await login( username,email, password);
    setUser(data.user)
    setLoading(false)
   }

   async function handelGetme(){
    setLoading(true)
    const data = await getMe()
    setUser(user.data)
    setLoading(false)
   }

   async function handellogout(){
    setLoading(true)
    const data  = await logout()
    setUser(null)
    setLoading(false)
   }
 
   return({user , loading ,handelGetme, handelLogin, handelRegister, handellogout})

}