import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request: any, { params }: any) => {
  try {
    connectToDB();
    const prompts = await Prompt.findById(params.id).populate('creator');
    if (!prompts) {
      return new Response('Prompt not found', { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch Prompt', { status: 500 });
  }
};

export const PATCH = async (request: any, { params }: any) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const promptExist = await Prompt.findById(params.id).populate('creator');
    if (!promptExist) {
      return new Response('Prompt not found', { status: 404 });
    }
    promptExist.prompt = prompt;
    promptExist.tag = tag;

    await promptExist.save();

    return new Response('Prompt update success', { status: 200 });
  } catch (error) {
    return new Response('Failed to update Prompt', { status: 500 });
  }
};

export const DELETE = async (request: any, { params }: any) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id).populate('creator');
    return new Response('Prompt deleted success', { status: 200 });
  } catch (error) {
    return new Response('Failed to update Prompt', { status: 500 });
  }
};
