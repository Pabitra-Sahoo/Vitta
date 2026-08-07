import { NextRequest } from 'next/server';
import { VITTA_AI_SYSTEM_PROMPT } from '@/lib/aiConfig';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastMessage = messages[messages.length - 1]?.content || 'Hello';
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY || process.env.ANTHROPIC_API_KEY;

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (apiKey && process.env.GEMINI_API_KEY) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [
                    { role: 'user', parts: [{ text: `${VITTA_AI_SYSTEM_PROMPT}\n\nUser Question: ${lastMessage}` }] },
                  ],
                }),
              }
            );

            if (response.body) {
              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              let buffer = '';

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    try {
                      const parsed = JSON.parse(line.replace('data: ', ''));
                      const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (text) {
                        controller.enqueue(encoder.encode(text));
                      }
                    } catch (e) {
                      // Skip invalid chunk JSON
                    }
                  }
                }
              }
            }
          } catch (err) {
            controller.enqueue(encoder.encode(`[Vitta AI Stream Error]: ${String(err)}`));
          }
        } else {
          const simulatedResponse = `Welcome to Vitta AI Financial Analytics. 

Regarding your question ("${lastMessage}"):

• **Budget & Net Balance Status**: Your monthly SLA limit is set to **$2,500.00**.
• **Category Analysis**: Housing and Dining out represent 65% of monthly expenditures.
• **Financial Recommendation**: Maintaining a 15% emergency reserve buffer will keep your financial health score optimal above the 85th percentile.

Is there any specific transaction category or SLA budget limit warning you would like me to recalculate?`;

          const chunks = simulatedResponse.split(' ');
          for (let i = 0; i < chunks.length; i++) {
            const token = (i === 0 ? '' : ' ') + chunks[i];
            controller.enqueue(encoder.encode(token));
            await new Promise((resolve) => setTimeout(resolve, 40));
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process streaming chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
