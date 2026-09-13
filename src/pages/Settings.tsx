import { Brain, Bell, Lock, User, Mail, Shield, Moon, Sun } from 'lucide-react';
import { ProfileMenu } from '../components/ProfileMenu';
import { useTheme } from '../context/ThemeContext';

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <header className="fixed w-full bg-[#0B0F17]/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-[#00FFB2]" />
              <span className="text-xl font-bold text-[#00FFB2]">renat.ai</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-300 hover:text-white">Chat</a>
              <a href="/about" className="text-gray-300 hover:text-white">About</a>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#00FFB2] mb-4">Settings</h2>
            <p className="text-gray-300">Manage your account settings and preferences</p>
          </div>

          <div className="space-y-8">
            {/* Account Settings */}
            <section className="bg-[#151B27] rounded-lg p-6 border border-[#2A3343]">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-[#00FFB2]" />
                Account Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#1A1E24] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white">Email Address</p>
                      <p className="text-sm text-gray-400">Update your email address</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm bg-[#2A2F36] text-white rounded-lg hover:bg-[#353B44] transition-colors">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1A1E24] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white">Password</p>
                      <p className="text-sm text-gray-400">Change your password</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm bg-[#2A2F36] text-white rounded-lg hover:bg-[#353B44] transition-colors">
                    Update
                  </button>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="bg-[#151B27] rounded-lg p-6 border border-[#2A3343]">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-[#00FFB2]" />
                Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#1A1E24] rounded-lg">
                  <div className="flex items-center space-x-3">
                    {theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="text-white">Theme</p>
                      <p className="text-sm text-gray-400">Switch between dark and light mode</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="px-4 py-2 text-sm bg-[#2A2F36] text-white rounded-lg hover:bg-[#353B44] transition-colors"
                  >
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1A1E24] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white">Notifications</p>
                      <p className="text-sm text-gray-400">Manage notification preferences</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm bg-[#2A2F36] text-white rounded-lg hover:bg-[#353B44] transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </section>

            {/* Privacy & Security */}
            <section className="bg-[#151B27] rounded-lg p-6 border border-[#2A3343]">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-[#00FFB2]" />
                Privacy & Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#1A1E24] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm bg-[#2A2F36] text-white rounded-lg hover:bg-[#353B44] transition-colors">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1A1E24] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white">Data Privacy</p>
                      <p className="text-sm text-gray-400">Manage your data and privacy settings</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm bg-[#2A2F36] text-white rounded-lg hover:bg-[#353B44] transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}