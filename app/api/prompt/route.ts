import Prompt from '@models/api/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request: any) => {
  try {
    connectToDB();
    const prompts = await Prompt.find().populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all Prompt', { status: 500 });
  }
};
