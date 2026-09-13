import { useState, useRef, useEffect } from 'react';
import { User, LogIn, UserPlus, Settings2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PulsingBackground } from './PulsingBackground';
import { useNavigate } from 'react-router-dom';

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignUp = () => {
    setIsOpen(false);
    navigate('/signup');
  };

  const handleLogin = () => {
    setIsOpen(false);
    navigate('/login');
  };

  const handleSettings = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-400 hover:text-[#00FFB2] transition-colors relative group"
        aria-label="User profile"
      >
        <PulsingBackground>
          <User className="relative w-5 h-5" />
          {!user ? (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
          ) : (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </PulsingBackground>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#1A1E24] border border-gray-800 shadow-lg py-1">
          {!user ? (
            <>
              <button
                onClick={handleSignUp}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2F36] hover:text-[#00FFB2] transition-colors group"
              >
                <UserPlus className="w-4 h-4 mr-2 group-hover:text-[#00FFB2] transition-colors" />
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2F36] hover:text-[#00FFB2] transition-colors group"
              >
                <LogIn className="w-4 h-4 mr-2 group-hover:text-[#00FFB2] transition-colors" />
                Login
              </button>
            </>
          ) : (
            <>
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm text-gray-400">Signed in as</p>
                <p className="text-sm font-medium text-[#00FFB2] truncate">{user.email}</p>
              </div>
              <button
                onClick={handleSettings}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2F36] hover:text-[#00FFB2] transition-colors group"
              >
                <Settings2 className="w-4 h-4 mr-2 group-hover:text-[#00FFB2] transition-colors" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors group border-t border-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:text-red-400 transition-colors" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}