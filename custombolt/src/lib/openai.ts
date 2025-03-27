import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function sendPrompt(
  messages: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
    const res = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
    });

    return res.choices[0].message?.content ?? '';
}
