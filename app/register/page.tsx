"use client";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Register = () => {

    const [error,setError] = useState(false)
    const router = useRouter()
  
    const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{

        e.preventDefault()
    
        const username = (e.currentTarget[0] as HTMLInputElement).value;
        const name = (e.currentTarget[0] as HTMLInputElement).value;
        const email = (e.currentTarget[2] as HTMLInputElement).value;
        const password = (e.currentTarget[3] as HTMLInputElement).value;
        
        try {
    
          const res = await fetch("/api/auth/register",{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              username,
              name,
              email,
              password
            })
          })
    
          res.status === 201 &&  router.push("/login?success=Account has been created")
    
        } catch (error) {
            setError(true)
        }
    
      }

  return (
    
    <div className="z-[9999] mt-20 flex max-w-3xl  mx-auto  justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" >
        <input 
          type="text" 
          placeholder="username" 
          className="text-[#000000] p-2 rounded-[5px] outline-none"
          required
          /> 
           <input 
          type="text" 
          placeholder="name" 
          className="text-[#000000] p-2 rounded-[5px] outline-none"
          required
          /> 
          <input 
          type="email" 
          placeholder="email" 
          className="text-[#000000] p-2 rounded-[5px] outline-none"
          required
          />
          <input 
          type="password" 
          placeholder="password" 
          className="text-[#000000] p-2 rounded-[5px] outline-none"
          required
          />
          <button className="bg-dark-1 text-[#fff] rounded-[5px] p-1">Register</button>
          <div>
                  <p className="text-[#fff]">Do you have an account? <Link href="/login" className="text-[#00e054]">Login</Link></p>
                </div>
        </form>
        {error && "Something went wrong"}

    </div>
  )
}

export default Register