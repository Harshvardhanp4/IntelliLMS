import React, { useState } from 'react'
import logo from "../assets/ims_logo.png"
import google from "../assets/google.png"
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import {ClipLoader} from 'react-spinners'
function Signup(){

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole ] = useState("student");
    const [loading, setLoading] = useState(false);


    const handleSignup = async ()=>{
        setLoading(true)
        try{
            const result = await axios.post(serverUrl + "/api/auth/signup", {name, password, email, role},{withCredentials:true})
            console.log(result.data)
            setLoading(false)
            navigate("/")
            toast.success("Sign Up Successful")
        }catch(error){
            console.log(error)
            setLoading(false)
            toast.error("Error while signing up")
        }
    }
        
    return (
        <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
           <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex 'onSubmit={(e)=>{
            e.preventDefault()
           }}>
                {/* left div */}

                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                    <div>
                    <h1 className='font-semibold text-black text-2xl'>Get Started now</h1>
                    <h2 className='text-[#999797] text-[18px] pl-2'>Create your account</h2>
                    </div>

                    {/* name */}
                    <div className=' flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                    <label htmlFor="name" className='font-semibold'>Name</label>
                    <input id="name" type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your Name' 
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                    </div>

                    {/* email */}
                     <div className=' flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input id="email" type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your Email'
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                    </div>

                    {/* password */}
                     <div className=' flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input id="password" type="password" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your Password'
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value) 
                    }}/>
                    </div>

                    {/* roles */}
                    <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
                        <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-4xl cursor-pointer hover:border-black ${role === "student"? "border-black" : "border-[#646464]"} `}onClick={()=>{
                            setRole("student")
                        }}>Student</span>
                        <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-4xl cursor-pointer hover:border-black ${role === "educator"? "border-black" : "border-[#646464]"} `}onClick={()=>{
                            setRole("educator")
                        }}>Educator</span>
                    </div>

                    {/* button */}
                    <button type="button" className="w-[80%] h-[50px] text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer" disabled={loading} onClick={handleSignup}>{loading ?<ClipLoader size={30} color='white'/>:"Sign Up"}</button>
                    <div className='w-[80%] flex items-center gap-2'>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                        <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>or continue</div>
                        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    </div>

                    <div className='w-[80%] h-[40px] border-1 border-black rounded-[5px]n flex items-center justify-center '>
                        <img src={google} className='w-[40px] -mr-2'alt="" />
                        <span className='cursor-pointer'>oogle</span>
                    </div>
                    <div className='text-[#6f6f6f]'>
                        Already have an account?
                        <span className='underline underline-offset-1 cursor-pointer' onClick={()=>{
                            navigate("/login")
                        }}>Login</span>
                        
                    </div>



                </div>
 
                {/* right div */}
                <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
                    <img src={logo} alt="IntelliLMS Logo" className='w-30 shadow-2xl' />
                    <span className='text-2xl text-white'>IntelliLMS</span>

                </div>
           </form>
        </div>
    )
}

export default Signup
