import { Brain, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { ChatBot } from './components/ChatBot';
import { GlitchText } from './components/GlitchText';
import { SacredGeometry } from './components/SacredGeometry';
import { ProfileMenu } from './components/ProfileMenu';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0B0F17] text-white overflow-hidden">
      <SacredGeometry />
      <header className="fixed w-full bg-[#0B0F17]/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-1 sm:space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#00FFB2] opacity-10 group-hover:opacity-20 blur-lg transition-opacity"></div>
                <div className="absolute -inset-8 rounded-full animate-brain-pulse" style={{ background: 'radial-gradient(circle, rgba(0, 255, 178, 0.15) 0%, rgba(0, 255, 178, 0) 70%)' }}></div>
                <Brain className="relative w-6 h-6 sm:w-8 sm:h-8 text-[#00FFB2]" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#00FFB2]">renat.ai</span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/about" className="text-gray-300 hover:text-white text-sm sm:text-base">About</a>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-lg sm:text-xl text-gray-300 mb-2">Advanced AGI powered by</h1>
              <a 
                href="https://daias.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-3xl sm:text-4xl font-bold hover:opacity-90 transition-opacity"
              >
                <GlitchText text="DAIAS" />
              </a>
            </div>

            <ChatBot />
          </div>
        </div>
      </div>

      <footer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-sm sm:text-base">
              <span>Made by</span>
              <a 
                href="https://devstudio.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors"
              >
                DevStudio Pro
              </a>
              <span>with</span>
              <a 
                href="https://bolt.new/?rid=1cmcp4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors"
              >
                bolt.new
              </a>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a
                href="https://github.com/renatrazumov"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#00FFB2] transition-colors" 
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/renatrazumov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FFB2] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/renatrazumov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FFB2] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@renatrazumov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FFB2] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;