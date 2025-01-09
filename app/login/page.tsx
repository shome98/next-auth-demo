"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent,useEffect,useState } from "react"

export default function Login(){
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "authenticated") {
            console.log(session.user);
        }
    })
    const handleLogin=async(event:FormEvent)=>{
        event.preventDefault();
        console.log(email+" "+password);
        const signinCred=await signIn("credentials",{
            email:email,
            password:password,
            redirect:false
        });
        console.log(signinCred);
    }
    const handleGoogle = async (e: FormEvent) => {
        e.preventDefault();
        const signAuth = await signIn("google", { redirect: true });
        if (signAuth?.ok) router.push("/");
        console.log(signAuth?.status);
        console.log(signAuth?.error);

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
        <button type="submit" onClick={handleGoogle} className="p-4 bg-slate-300 text-black"> google login</button>
        {status==="authenticated"&&<h1>you are signed in</h1>}
            
    </>);
}