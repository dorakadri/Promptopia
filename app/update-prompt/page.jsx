"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const editprompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const{data:session} = useSession();
  const promptId = searchParams.get("id");
  const router = useRouter();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    if(!session) redirect('/')
   
   }, [session])
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

   const EditPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    if(!promptId) return alert("Prompt id not found");
    try {
      const res = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }; 
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={EditPrompt}
    />
  );
};

export default editprompt;
