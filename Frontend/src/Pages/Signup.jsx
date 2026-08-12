import { useNavigate } from 'react-router-dom';
import signinImg from '../assets/signin.png';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore.js';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, googleLogin, isLoading, error } = useAuthStore();

  // console.log(username,email,password);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(username, email, password)
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      navigate('/');
    }
    catch (error) {
      console.log(error);
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
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Your Username"
            className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#737373]"></div>
          <span className="text-[#737373] text-sm">OR</span>
          <div className="flex-1 h-px bg-[#737373]"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white text-black py-2 rounded text-base font-medium hover:opacity-90 cursor-pointer flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          Continue with Google
        </button>

        <div className="mt-10 text-[#737373] text-sm">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate('/signin')}
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
