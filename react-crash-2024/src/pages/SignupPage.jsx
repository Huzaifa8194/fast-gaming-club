import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      toast.error("Emails do not match!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!username || !age) {
      toast.error("Please fill in all fields.");
      return;
    }

    if ( age <= 0 )
    {
      toast.error("Please insert a valid age.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful!");
      navigate('/');
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signup with Google successful!");
      navigate('/');
    } catch (error) {
      console.error("Error signing up with Google:", error);
      toast.error("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-800">
      <div className="bg-stone-700 p-8 rounded-lg shadow-lg w-full max-w-sm mt-5">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>
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
            <label className="block text-sm font-medium text-white" htmlFor="confirmEmail">
              Confirm Email
            </label>
            <input
              type="email"
              id="confirmEmail"
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
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
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-800 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            Signup
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleGoogleSignup}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
