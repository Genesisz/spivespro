"use client";
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    try {
      // In a real app, you would make an actual API call here
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Login attempted with:', { email, password });
      // Handle successful login here
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] max-w-screen relative text-center overflow-x-hidden flex justify-center items-center">
    <div className="absolute top-0 left-0 w-screen h-[100vh]">
      <img
        src="/images/landing-page/hero-bg.png"
        alt="hero background"
        className="w-full h-full"
      />
    </div>
    <div className="absolute top-0 left-0 w-screen h-[100vh] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

      
      <div className="w-full relative flex flex-col items-center justify-center rounded-lg shadow-xl z-10">
        <div className="p-8 max-w-xl w-[100%]">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 adumu">
              <span className="text-white">Welcome</span>
              <span className="text-orange-400"> back</span>
            </h1>
            <p className="text-xl text-white">Please login your account details</p>
          </div>

          <form onSubmit={handleSubmit} className='bg-white rounded-xl w-full p-4 md:p-10'>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6 text-sm">
              <button type="button" className="text-orange-400 hover:text-orange-500 font-medium">
                Create account
              </button>
              <button type="button" className="text-blue-950 hover:text-blue-950 font-medium">
                Forgotten Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-4 rounded-md hover:bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;