import { useState, useRef, useEffect, type FormEvent } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { getChatCompletion } from '../lib/openai';
import { getMessages, saveMessage, supabase } from '../lib/supabase';
import { trackEvent } from '../lib/analytics';

interface ChatMessage {
  content: string;
  isBot: boolean;
  error?: boolean;
}

interface Message {
  content: string;
  isBot: boolean;
}

export function ChatBot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hi! I'm Renat.ai - How can I help you today?",
      isBot: true
    }
  ]);
  const [conversationId] = useState(() => uuidv4());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const savedMessages = await getMessages(conversationId);
        if (savedMessages.length > 0) {
          setMessages(savedMessages.map(msg => ({
            content: msg.content,
            isBot: msg.role === 'assistant'
          })));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [conversationId]);

  // Convert messages to OpenAI format
  const getOpenAIMessages = (msgs: Message[]) => {
    return msgs.map(msg => ({
      role: (msg.isBot ? 'assistant' : 'user') as 'assistant' | 'user',
      content: msg.content
    }));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      await saveMessage(userMessage, 'user', conversationId);
      setMessages(prev => [...prev, { content: userMessage, isBot: false }]);
      
      // Track message sent event
      trackEvent('message_sent', {
        conversation_id: conversationId
      });

      const aiResponse = await getChatCompletion(getOpenAIMessages([...messages, { content: userMessage, isBot: false }]));
      await saveMessage(aiResponse, 'assistant', conversationId);
      setMessages(prev => [...prev, { content: aiResponse, isBot: true }]);
      
      // Track response received event
      trackEvent('response_received', {
        conversation_id: conversationId
      });
    } catch (error) {
      // Track error event
      trackEvent('chat_error', {
        conversation_id: conversationId,
        error_message: (error as Error).message
      });
      setMessages(prev => [...prev, {
        content: (error as Error).message,
        isBot: true,
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0F17] rounded-lg shadow-2xl flex flex-col h-[600px] sm:h-[600px] w-full max-w-4xl mx-auto md:mt-0 mt-4">
      {/* Chat Header */}
      <div className="flex items-center p-4 sm:p-6 border-b border-[#1A1E24]">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FFB2]" />
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[#00FFB2] opacity-10 group-hover:opacity-20 blur-lg transition-opacity"></div>
            <div className="absolute -inset-8 rounded-full animate-brain-pulse" style={{ background: 'radial-gradient(circle, rgba(0, 255, 178, 0.15) 0%, rgba(0, 255, 178, 0) 70%)' }}></div>
            <span className="font-semibold text-white text-base sm:text-lg relative">
              Chat with <span className="text-[#00FFB2]">renat.ai</span>
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            Hi! I'm Renat, an advanced AI assistant. How can I help you today?
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-lg shadow-sm ${
                message.isBot
                  ? message.error
                    ? 'bg-red-500/10 text-red-400 border border-red-800/50'
                    : 'bg-[#1A1E24] text-gray-100 border border-[#2A3343]'
                  : 'bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/20'
              }`}
            >
              {message.error ? (
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">Error</span>
                  <span className="text-sm">{message.content}</span>
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1D2433] text-gray-100 p-4 rounded-lg shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-6">
        <div className="flex space-x-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 sm:p-4 text-sm sm:text-base rounded-lg bg-[#1A1E24] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] border border-[#2A3343]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-[#00FFB2] text-black p-3 sm:p-4 rounded-lg hover:bg-[#00FFB2]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}