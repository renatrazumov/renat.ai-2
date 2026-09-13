import type { Config, Context } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

type ChatRole = 'user' | 'assistant' | 'system';

interface ChatMessage {
  role: ChatRole;
  content: string;
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status });
}

async function requireUser(req: Request) {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) {
    return null;
  }

  const supabaseUrl = Netlify.env.get('VITE_SUPABASE_URL') ?? Netlify.env.get('SUPABASE_URL');
  const supabaseAnon =
    Netlify.env.get('VITE_SUPABASE_ANON_KEY') ?? Netlify.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnon) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: auth } },
  });

  const token = auth.slice('Bearer '.length);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return null;
  }
  return data.user;
}

export default async (req: Request, _context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const user = await requireUser(req);
    if (!user) {
      return json(401, { error: 'Sign in to chat' });
    }

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const messages = (body.messages ?? [])
      .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
      .slice(-24);

    if (messages.length === 0) {
      return json(400, { error: 'messages required' });
    }

    // Prefer Netlify AI Gateway (auto-injected OPENAI_*). Optional OpenRouter fallback
    // matches the prior production chat path when OPENROUTER_API_KEY is set.
    const openRouterKey = Netlify.env.get('OPENROUTER_API_KEY');
    const openai = openRouterKey
      ? new OpenAI({
          apiKey: openRouterKey,
          baseURL: 'https://openrouter.ai/api/v1',
          defaultHeaders: {
            'HTTP-Referer': 'https://renat.ai',
            'X-Title': 'renat.ai',
          },
        })
      : new OpenAI();

    const model =
      Netlify.env.get('RENAT_CHAT_MODEL') ??
      (openRouterKey ? 'openai/gpt-4o-mini' : 'gpt-4o-mini');

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are renat.ai, Renat Razumov’s private Personal OS assistant. Be concise, practical, and protective of private data. Do not invent access to systems you cannot reach.',
        },
        ...messages,
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) {
      return json(502, { error: 'Empty model response' });
    }

    return json(200, { content });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Chat failed';
    console.error('chat error', message);

    if (/quota|billing|insufficient/i.test(message)) {
      return json(402, { error: 'API quota exceeded' });
    }
    if (/rate|429/i.test(message)) {
      return json(429, { error: 'Too many requests' });
    }

    return json(500, { error: 'Chat failed' });
  }
};

export const config: Config = {
  path: '/api/chat',
  method: ['POST', 'OPTIONS'],
};
