import { useEffect, useState } from "react";

export function Loading() {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => { 
      setTimeout(() => {
        setLoading(false); 
      }, 600); 
    }, [])

    if(loading){
        return (
            <div  className="min-w-screen min-h-screen flex items-center justify-center">
            <div className=" flex justify-center items-center ">
              <div className="absolute animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-purple-500"></div>
              <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-28 w-28" />
              </div>
              </div>
            )
    }}