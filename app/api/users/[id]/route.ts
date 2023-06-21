import User from '@models/api/user';
import { connectToDB } from '@utils/database';

export const GET = async (request: any, { params }: any) => {
  try {
    connectToDB();
    const user = await User.findById(params?.id);
    if (!user) {
      return new Response('User not found', { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch user', { status: 500 });
  }
};
