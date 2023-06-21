'use client';

import Post from '@models/post';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

interface PromptCardInterface {
  post: Post;
  handleTagList?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PromptCard = (props: PromptCardInterface) => {
  const { post, handleTagList, handleEdit, handleDelete } = props;
  const [copied, setCopied] = useState<string>('');
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  const profileLink = useMemo(() => {
    if (post.creator?._id === session?.user.id) {
      return '/profile';
    }
    return '/profile/' + post.creator?._id;
  }, [post, session]);

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex justify-center gap-3 cursor-pointer">
          <Link href={profileLink}>
            <Image
              src={post?.creator?.image ?? ''}
              width={40}
              height={40}
              className="rounded-full object-contain"
              alt="user_image"
            />
          </Link>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? '/assets/icons/tick.svg'
                  : '/assets/icons/copy.svg'
              }
              width={12}
              height={12}
              alt="icon"
            />
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagList && handleTagList(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user?.id === post?.creator?._id && pathname === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
