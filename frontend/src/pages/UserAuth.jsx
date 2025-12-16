import React, { useState } from "react";
import loginImg from "../assets/login.jpg"; 
import {toast, ToastContainer}from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const UserAuth = ({ onLogin }) => {
  const navigate =useNavigate();
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("local");
  const [error, setError] = useState("");
 const[otp,setOtp]= useState("");
 const[step,setStep] = useState("form");
 const[loading, setLoading] = useState(false);
 


const API = "http://localhost:5000";

 const handleRequestOTP =async(e) => {       //handle otp request
    e.preventDefault();
    setError("");

    if(!uid.trim() || !name.trim() || !email.trim()){
        setError("All fields are required");
        return;
    }

    setLoading(true);


    try{
        const res = await fetch(`${API}/api/auth/send-otp`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email}),
        });
        
        const data = await res.json();
        console.log("STATUS:", res.status, data);
        if(res.ok){
            setStep("otp");
        }else{
            setError(data.error || "Failed to send otp");
        }
    }catch(err){
    console.log(err);
    setError("Network error");
    }
    setLoading(false);
 }
 

 const handleVerifyOtp = async() =>{       //handle verify otp
    if(!otp.trim()){
        setError("Please send OTP");
        return;
    }
    setLoading(true);
    setError("");

    try{
        const res = await fetch(`${API}/api/auth/verify-otp`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,otp,uid,name,provider}),
        });

        const data = await res.json();
        if(res.ok){
          toast.success("OTP verfied! Redirecting...");
          setTimeout(()  => {
            localStorage.setItem("loggedUser",JSON.stringify(data.user));
            onLogin(data.user);
            navigate("/portfolio");

          },2000);
            
        }else{
            setError("Invalid OTP");
        }
    }
    catch(err){
        setError("Network Error");
    }
    setLoading(false);
 };
    
 
 

  return (

    <div className="min-h-screen flex items-center justify-start bg-black px-4 ">
      <ToastContainer position="top-center" autoClose={3000}/>
    <div className="w-full max-w-md bg-black shadow-xl rounded-2xl p-8 mt-[-190px] ml-20">
      <h2 className="text-3xl font-semibold text-center text-white">Welcome Back💡</h2>

      


      {step === "form" && (
        <form onSubmit = {handleRequestOTP} className="space-y-4">
            <div>
                <label className="block text-white mb-1">UID:</label>
                <input value={uid} onChange={(e) => setUid(e.target.value)}
                placeholder="Enter UID"
                className="w-full px-4 py-2 border rounded-lg bg-transparent text-white"/>
            </div>

            <div>
                <label className="block text-white mb-1">Name:</label>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full px-4 py-2 border rounded-lg bg-transparent text-white"/>
            </div>
    
            <div>
                <label className="block text-white mb-1">Email:</label>
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full px-4 py-2 border rounded-lg bg-transparent text-white"/>
            </div>
    
             {error && <p className="text-red-500 text-sm">{error}</p>}

             <button
             type="submit"
             disabled={loading}
             className="w-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold"
             >{loading ? "Sending OTP...":"Send OTP"}</button>
        </form>
      )}




       {step === "otp" &&  (
        <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleVerifyOtp();
        }}
        className="space-y-4 mt-6">
          <input   value={otp} onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-lg bg-transparent text-white"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold"
          >{loading ? "Verifying...":"Verify OTP"}
          </button>

          <button
          type="button"
          onClick={handleRequestOTP}
          className="w-full text-gray-300 text-sm underline"
          >Resend OTP</button>

        </form>
       )}




    </div>

    <div className="hidden md:flex justify-center items-center ml-[190px]">
        <img src={loginImg} alt="Login Illustartion" className="w-[450px] object-contain drop-shadow-2xl"/>
    </div>
    </div>

    
  );
};

export default UserAuth;
