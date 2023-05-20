'use client';

import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session]);

  const handleEdit = (post: any) => {
    router.push(`/update-prompt/?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are your sure to delete this prompt');
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });
        setPosts(posts.filter((postItem: any) => postItem._id !== post._id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
