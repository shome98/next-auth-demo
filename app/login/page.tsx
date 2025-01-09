"use client";
import { signIn } from "next-auth/react";
import { FormEvent, RefCallback, useState } from "react"

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleLogin=async(event:FormEvent)=>{
        event.preventDefault();
        console.log(email+" "+password);
        const signinCred=await signIn("credentials",{
            email:email,
            password:password,
            redirect:false
        });
        
    }
    return (<>
            <h1>Login page</h1>
            <input 
            type="email" 
            name="email" 
            id="email" 
            value={email} 
            className="text-black font-black"
            onChange={(event)=>setEmail(event?.target.value)} 
            placeholder="Enter your email here" />
            <input 
            type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={(event)=>setPassword(event?.target.value)} 
            placeholder="Enter your password here" />
            <button type="submit" onClick={handleLogin}>login</button>
            
    </>);
}