import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import signinImg from '../assets/signin.png';
import { useAuthStore } from '../store/authStore.js';

const SignIn = () => {
  const navigate=useNavigate();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [showSuccess,setShowSuccess]=useState(false);
  const { login, isLoading, error, message } = useAuthStore();

  const handleSignIn=async(e)=>{
    e.preventDefault();
    setShowSuccess(false);

    try{
      await login(username,password);
      setShowSuccess(true);
      setTimeout(() => navigate('/'), 800);
    }
    catch(err){
      console.log(err);
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

        <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {showSuccess && message && (
            <p className="text-green-400 text-sm">{message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-[#737373] text-sm">
          <p>
            New to Netflix?{" "}
            <span onClick={()=>navigate('/signup')}
              className="text-white font-medium cursor-pointer ml-2 hover:underline"
            >
              Sign Up Now
            </span>
          </p>
        </div>
      </div>
    </div>
    );
};

export default SignIn;
