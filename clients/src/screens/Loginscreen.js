import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
function Loginscreen() {
  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading] = useState(false);
  const [error,setError]=useState('');
  

  async function login(){
   
      const user={
        email,
        password
      }

      try {
        setLoading(true);
        const result=await axios.post('/api/users/login',user).then(data => data)
        setLoading(false);

        localStorage.setItem('currentUser', JSON.stringify(result));
        window.location.href='/home'
        
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
      
  
  }
  return (
    <div>
      
        <div className="row justify-content-center mt-5  ">
            <div className="col-md-5 mt-5">
              {error && (<Error message='Invalid Credentials'/>)}
                <div className='bs'>
                <h2>LOGIN</h2>
               
                <input type='text' className='form-control' placeholder='Email Id'
                value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='Password'
                value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
               
                <button className='btn btn-primary mt-3 btn5' onClick={login}>Login</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Loginscreen

