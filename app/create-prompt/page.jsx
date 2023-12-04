'use client';

import Form from '@components/Form';
import { useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";
import {useEffect, useState} from 'react';

const createprompt = () => {
  const [submitting,setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [post,setPost] = useState({
    prompt:'',
    tag:'',

  });
  useEffect(() => {
    if(!session) redirect('/')
   
   }, [session])
  const createPrompt = async(e) => {
e.preventDefault(); 

setSubmitting(true);
try {
  const res =await fetch ('api/prompt/new', {
    method: 'POST',
    body: JSON.stringify({
    prompt :post.prompt,
    userId:session?.user.id,
    tag:post.tag
    })
  })
  if(res.ok){
    router.push('/');
  }
} catch (error) {
  console.log(error);

}finally{
  setSubmitting(false);
}


  }
  return (
  <Form  
  type="Create"
  post={post}
  setPost={setPost}
  submitting={submitting}
  handleSubmit={createPrompt}  
  />
  )
}

export default createprompt 