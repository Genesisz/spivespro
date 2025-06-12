"use client";
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';
const LoginPage: React.FC = () => {
  const router = useRouter();
  const { authenticated, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && authenticated) {
      router.push('/dashboard');
    }
  }, [authenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLocal(true);
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard',
    });
    setLoadingLocal(false);
    if (res?.error) {
      setError(res.error);
    } else if (res?.ok) {
      window.location.href = '/dashboard';
    }
    // Do not redirect here; let useEffect handle it
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="h-[100dvh] max-w-screen relative text-center overflow-x-hidden flex justify-center items-center">
    <div className="absolute bottom-0 left-0 w-screen h-[140dvh]">
      <img
        src="/images/landing-page/hero-bg.png"
        alt="hero background"
        className="w-full h-full"
      />
    </div>
    <div className="absolute top-0 left-0 w-screen h-[100dvh] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

      
      <div className="w-full relative flex flex-col items-center justify-center rounded-lg shadow-xl z-10">
        <div className="p-8 max-w-xl w-[100%]">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-1 md:mb-4 adumu">
              <span className="text-white">Welcome</span>
              <span className="text-orange-400"> back</span>
            </h1>
            <p className="text-md md:text-xl text-white">Please login your account details</p>
          </div>

          <form onSubmit={handleSubmit} className='bg-white rounded-xl w-full p-4 md:p-10'>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs text-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6 text-xs md:text-sm">
              <Link href="/register" className="text-orange-400 hover:text-orange-500 font-medium">
                Create account
              </Link>
              <button type="button" className="text-blue-950 hover:text-blue-950 font-medium">
                Forgotten Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2 md:py-4 rounded-md hover:bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
              disabled={loadingLocal}
            >
              {loadingLocal ? (
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