import { supabase } from './supabase';

// Chat completions go through the /api/chat Netlify Function (OpenRouter),
// so no provider key is ever shipped to the browser.
export async function getChatCompletion(messages: { role: 'user' | 'assistant' | 'system', content: string }[]) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Please sign in to chat.');
  }

  let response: Response;
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ messages: messages.filter(m => m.role !== 'system') }),
    });
  } catch (error) {
    console.error('Error calling chat API:', error);
    throw new Error('An error occurred while getting the AI response. Please try again later.');
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Your session has expired. Please sign in again.');
    }
    if (response.status === 402) {
      throw new Error('API quota exceeded. Please try again later or contact support to upgrade your plan.');
    }
    if (response.status === 429) {
      throw new Error('Too many requests. Please wait a moment before trying again.');
    }
    throw new Error('An error occurred while getting the AI response. Please try again later.');
  }

  const { content } = await response.json();
  return content as string;
}
