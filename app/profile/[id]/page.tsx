import Profile from '@components/Profile';

const fetchPostsByUserId = async (userId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/users/${userId}/posts`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
};

const ProfileDetail = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const posts = await fetchPostsByUserId(params.id);

  return (
    <Profile
      name={searchParams.name}
      desc={`Welcome to ${searchParams.name} profile page . Explore ${searchParams.name}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default ProfileDetail;
