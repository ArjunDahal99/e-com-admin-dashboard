"use client"

import { useEffect, useState } from "react"

export const useOrigin = ()=>{
    const [mounted,setMountedd] = useState(false)
    const origin = typeof window !== "undefined" && window.location.origin? window.location.origin:"";

    useEffect(()=>{
        setMountedd(true)
    },[])
   if ( !mounted)
   {
    return "";
   }
   return origin
}