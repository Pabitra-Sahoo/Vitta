import { NextRequest } from 'next/server';
import { streamText, tool } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { VITTA_AI_SYSTEM_PROMPT } from '@/lib/aiConfig';
import { FinancialAnalysisInputSchema, executeFinancialAnalysis } from '@/lib/tools';

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

    const apiKey = process.env.GEMINI_API_KEY || '';

    // Initialize Google AI provider with custom header for AQ.Ab8 keys
    const google = createGoogleGenerativeAI({
      apiKey,
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        headers.set('x-goog-api-key', apiKey);
        return fetch(input, { ...init, headers });
      },
    });

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: VITTA_AI_SYSTEM_PROMPT,
      messages,
      tools: {
        calculateCategoryBudgetAnalysis: tool({
          description: 'Analyzes financial category budget, spending, and SLA limits to provide a health score and recommendation.',
          parameters: FinancialAnalysisInputSchema,
          execute: async (input) => {
            // Add an artificial delay so the user can see the "input-available" execution state
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return executeFinancialAnalysis(input);
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('[DEBUG] streamText error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process streaming chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
