'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface PromptCardInterface {
  prompt: any;
  handleTagList: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const PromptCard = (props: PromptCardInterface) => {
  const { prompt, handleTagList, handleEdit, handleDelete } = props;
  const [copied, setCopied] = useState<string>('');

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex justify-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt="user_image"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === prompt.prompt
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

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagList(prompt.tag)}
      >
        {prompt.tag}
      </p>
    </div>
  );
};

export default PromptCard;
