"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate=useRouter();
  return (
    <>
    <button onClick={()=>navigate.push("/login")}>login</button>
    <h1 className="mt-80 ml-80">Hi this is nextjs</h1>
    </>
  );
}
