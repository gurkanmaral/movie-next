"use client"
import { signIn,signOut, useSession } from "next-auth/react";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  
  const [error, setError] = useState("")
    const session = useSession()
    const router = useRouter()

    if(session.status === "loading"){
        return <p>Loading...</p>
    }
  
    if(session.status === "authenticated"){
      router?.push("/")
     }
   

    const handleSubmit =async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
       
        const email = (e.currentTarget[0] as HTMLInputElement).value;
        const password = (e.currentTarget[1] as HTMLInputElement).value;
    
        const result = await signIn("credentials", { email, password });
        
        if (result?.error) {
          setError("Wrong credentials"); 
        }
        
      }
  return (
    <div className=" z-[9999] mt-20 flex max-w-3xl  mx-auto  justify-center min-h-screen">
   <form  onSubmit={handleSubmit} className="flex flex-col gap-5" >

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
                <button className="bg-dark-1 text-[#fff] rounded-[5px] p-1" >Login</button>
                <div>
                  <p className="text-[#fff]">No account? <Link href="/register" className="text-[#00e054]">Register</Link></p>
                </div>
              </form>
              {error && <p>{error}</p>}

    </div>
  )
}

export default Page