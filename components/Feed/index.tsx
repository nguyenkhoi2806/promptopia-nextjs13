'use client';
import PromptCard from '@components/PromptCard';
import Post from '@models/post';
import { useEffect, useState } from 'react';

const Feed = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <div>
        <div className="mt-16 prompt_layout">
          {posts.map((post: Post) => (
            <PromptCard key={post._id} post={post} handleTagList={() => null} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feed;
