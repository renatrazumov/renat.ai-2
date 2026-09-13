import React, { useState } from 'react';
import { Brain, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SacredGeometry } from '../components/SacredGeometry';
import { GlitchText } from '../components/GlitchText';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F17] text-white overflow-hidden">
      <SacredGeometry />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10">
        <a href="/" className="flex items-center space-x-2 group mb-12">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[#00FFB2] opacity-10 group-hover:opacity-20 blur-lg transition-opacity"></div>
            <Brain className="relative w-8 h-8 text-[#00FFB2]" />
          </div>
          <span className="text-xl font-bold text-[#00FFB2]">renat.ai</span>
        </a>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <GlitchText text="Welcome Back" className="text-2xl font-bold mb-2" />
            <p className="text-gray-400">Sign in to continue to renat.ai</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#151B27] border border-[#2A3343] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFB2] focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#151B27] border border-[#2A3343] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFB2] focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#00FFB2] hover:bg-[#00FFB2]/90 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 space-y-4 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors">
                Sign up
              </a>
            </p>
            <p className="text-gray-400">
              Forgot your password?{' '}
              <a href="/forgot-password" className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors">
                Reset it here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}