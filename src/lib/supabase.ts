import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  user_id: string;
  conversation_id: string;
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data as Message[];
}

export async function saveMessage(content: string, role: 'user' | 'assistant', conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        content,
        role,
        conversation_id: conversationId,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving message:', error);
    throw error;
  }

  return data as Message;
}