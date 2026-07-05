type ChatMessage = {
  role: string;
  content: string;
};

type ChatRequestBody = {
  system: string;
  messages: ChatMessage[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 1000,
      messages: [
        { role: 'system', content: body.system },
        ...body.messages,
      ],
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
