'use client';

import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get('id');

  useEffect(() => {
    const getPromptDetail = async () => {
      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptID) {
      getPromptDetail();
    }
  }, [promptID]);

  const submitEditPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptID) {
      return alert(' Prompt id not found');
    }

    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={submitEditPrompt}
    />
  );
};

export default UpdatePrompt;
