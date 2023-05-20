import Prompt from '@models/api/prompt';
import { connectToDB } from '@utils/database';

export const POST = async (req: any, res: any) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Fail to create Prompt', { status: 500 });
  }
};
