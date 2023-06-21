import Profile from '@components/Profile';
import User from '@models/user';

const fetchPostsByUserId = async (userId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/users/${userId}/posts`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
};

const fetchUserWithId = async (userId: string) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const user = await response.json();
  return user as User;
};

const ProfileDetail = async ({ params }: { params: { id: string } }) => {
  const posts = await fetchPostsByUserId(params.id);
  const user = await fetchUserWithId(params.id);
  console.log(user);

  return (
    <Profile
      name={user.username}
      desc={`Welcome to ${user.username} profile page`}
      data={posts}
    />
  );
};

export default ProfileDetail;
