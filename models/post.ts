import User from './user';

interface Post {
  _id?: string;
  prompt: string;
  tag: string;
  creator?: User;
}

export default Post;
