'use client';

import Form from "@components/Form";
import { useState } from "react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const[post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (e: Event) => {

  } 
  
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt;