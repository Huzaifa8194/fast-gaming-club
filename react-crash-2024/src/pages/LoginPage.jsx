import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!");
      navigate('/');
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Invalid account/password");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Successfully logged in with Google!");
      navigate('/');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-800">
      <div className="bg-stone-700 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-800 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Login with Google
          </button>
        </div>
        <div className="text-center mt-4 text-white">
          <p>
            Don't have an account? <Link to="/signup" className="text-red-400 hover:text-red-600">Sign up</Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-red-400 hover:text-red-600">Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
