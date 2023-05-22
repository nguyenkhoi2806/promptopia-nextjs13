'use client';
import PromptCard from '@components/PromptCard';
import withLoading from '@hoc/withLoading';
import Post from '@models/post';
import { useEffect, useState } from 'react';

import FeedStyle from './feed.module.scss';

const Feed = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const FeedContentWithLoading = withLoading(() => (
    <div>
      <div className="mt-16 prompt_layout">
        {posts.map((post: Post) => (
          <PromptCard key={post._id} post={post} handleTagList={() => null} />
        ))}
      </div>
    </div>
  ));

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
      <FeedContentWithLoading
        isLoading={isLoading}
        className={FeedStyle['feed__loading']}
      />
    </section>
  );
};

export default Feed;
