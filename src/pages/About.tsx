import { Brain, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { ProfileMenu } from '../components/ProfileMenu';

export function About() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <header className="fixed w-full bg-[#0B0F17]/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#00FFB2] opacity-10 group-hover:opacity-20 blur-lg transition-opacity"></div>
                <div className="absolute -inset-8 rounded-full animate-brain-pulse" style={{ background: 'radial-gradient(circle, rgba(0, 255, 178, 0.15) 0%, rgba(0, 255, 178, 0) 70%)' }}></div>
                <Brain className="relative w-8 h-8 text-[#00FFB2]" />
              </div>
              <span className="text-xl font-bold text-[#00FFB2]">renat.ai</span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-300 hover:text-white">Chat</a>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 bg-[#0F1319]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#00FFB2] mb-4">About renat.ai</h2>
            <p className="text-gray-300 text-lg">
              Pioneering the future of artificial general intelligence through advanced research and development
            </p>
          </div>

          <div className="space-y-16">
            {/* Built with Advanced Technology */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Built with Advanced Technology</h3>
              <p className="text-gray-300">
                renat.ai is powered by cutting-edge technology, built using bolt.new - a revolutionary development platform that enables rapid creation of sophisticated AI applications.
              </p>
            </div>

            {/* Core Features */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Core Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">Advanced AI Chat Interface</p>
                </div>
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">Real-time Response Generation</p>
                </div>
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">Context-aware Conversations</p>
                </div>
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">Secure Authentication System</p>
                </div>
              </div>
            </div>

            {/* Technical Stack */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Technical Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">React + TypeScript</p>
                </div>
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">Supabase Backend</p>
                </div>
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">OpenAI Integration</p>
                </div>
                <div className="bg-[#151B27] p-4 rounded-lg border border-[#2A3343]">
                  <p className="text-gray-300">Real-time WebSocket Updates</p>
                </div>
              </div>
            </div>

            {/* Created By */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Created By</h3>
              <p className="text-gray-300 mb-6">
                Developed by Renat Razumov, a visionary AI researcher and developer dedicated to advancing artificial general intelligence. The project is powered by{' '}
                <a 
                  href="https://daias.netlify.app/" 
                  className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors"
                >
                  DAIAS
                </a>
                , a cutting-edge AI system designed for deep learning and autonomous intelligence.
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://renatrazumov.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors"
                >
                  renatrazumov.com
                </a>
                <a 
                  href="https://razu.mov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors"
                >
                  razu.mov
                </a>
                <a 
                  href="https://devstudio.pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors"
                >
                  DevStudio Pro
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400">
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
            <div className="flex items-center space-x-4">
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