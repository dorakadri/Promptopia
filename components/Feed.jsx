"use client";

import React, { useEffect, useState } from "react";
import PrompCard from "./PrompCard";

const PromptCardList =({data,handleTagClick})=>{
return (
  <div className="mt-16 prompt_layout">
    {data.map((post)=>(
      <PrompCard key={post._id} post={post} handleTagClick={handleTagClick}/>
    ))}
  </div>
)

}


const Feed = () => {
  const [searchtext, setSearchtext] = useState("");
  const [posts, setPosts] = useState([]); 

  const handlesearch = (e) => { 
     
    setSearchtext(e.target.value) 
    const filtredata = posts.filter(post => post.prompt.includes(e.target.value))
    setPosts(filtredata); 
   if(e.target.value.length===0){
    const fetchPosts=async ()=>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts();
   }
  };
const handleTagClick=(e)=>{
  setSearchtext(e) 

  const filtredata = posts.filter(post => post.tag === e)
  console.log(filtredata)
  setPosts(filtredata); 
 if(searchtext===""){
  const fetchPosts=async ()=>{
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data)
  }
  fetchPosts();
 }
}
  useEffect(() => {
  const fetchPosts=async ()=>{
    const response = await fetch('/api/prompt');
    const data = await response.json();
    console.log(data)
    setPosts(data)
  }
  
  fetchPosts();
  }, [])
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts"
          value={searchtext}
          required
          onChange={handlesearch}
          className="search_input peer"
        />
      </form>

      <PromptCardList
      
      data={posts}
      handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
