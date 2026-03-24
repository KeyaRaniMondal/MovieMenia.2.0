import { useNavigate } from 'react-router-dom';
import signinImg from '../assets/signin.png';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore.js';

const SignUp = () => {
  const navigate=useNavigate();
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const { signup, isLoading, error } = useAuthStore();

  // console.log(username,email,password);

  const handleSignUp=async(e)=>{
    e.preventDefault();

    try{
await signup(username,email,password)
navigate('/')
    }
    catch(error){
console.log(error)
    }
  }
    return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${signinImg})`,
      }}
    >
      <div className="max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8 py-14 mx-auto mt-8">
        <h1 className="text-3xl font-medium text-white mb-7">Sign In</h1>

        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
          <input
          value={username}
          onChange={e=>setUsername(e.target.value)}
            type="text"
            placeholder="Enter Your Username"
            className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base"
          />
          <input
            type="email"
             value={email}
          onChange={e=>setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base"
          />
          <input
            type="password"
             value={password}
          onChange={e=>setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base"
          />

{/* conditional rendering */}
{error && <p className="text-red-500">{error}</p>}
          <button
          disabled={isLoading}
            type="submit"
            className="w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-10 text-[#737373] text-sm">
          <p>
            Already have an account?{" "}
            <span onClick={()=>navigate('/signin')}
              className="text-white font-medium cursor-pointer ml-2 hover:underline"
            >
              Sign In Now
            </span>
          </p>
        </div>
      </div>
    </div>
    );
};
export default SignUp;
