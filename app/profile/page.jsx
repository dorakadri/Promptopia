'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'


const MyProfile = () => {
    const{data:session} = useSession();
    const router=useRouter(); 
    const search =useSearchParams();
    const id = search.get('id');
const [posts, setPosts] = useState([]);
const [user, setUser] = useState("");
useEffect(() => {
 if(!session) redirect('/')

}, [session])

    useEffect(() => {
        const fetchPosts=async ()=>{ 
          
          const response = await fetch(`/api/users/${ id ?  id :  session?.user.id}/posts`);
          const data = await response.json();
          console.log(data)
          setUser(data[0]?.creator.username)
         setPosts(data)
     
        }
        if(session?.user.id ===id ) {
          router.push('/profile')
        }
        if(session?.user.id || id )
        fetchPosts();
        }, [id])

    const handleEdit =(post)=>{
console.log(post)
if(post.creator.id === session?.user.id){
  router.push(`/update-prompt?id=${post._id}`)
}
else alert("you are only allowed to edit your own post ")
   
    } 

    const handleDelete = async(post)=>{ 
      console.log(post.creator.id) 
      const hasConfirmed =confirm('Are you sure you want to delete');
      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE'
          }) ;

          const filtredpost=posts.filter((p)=>p._id !== post._id);
          setPosts(filtredpost)
        } catch (error) {
          console.log(error)
        }
      }
        
    }
  return ( 
    
   <Profile  
   name={id ? user : "my"}
   desc={id ? `Welcome to ${user} profile` : "Welcome to your profile"}
   data={posts}
   handleEdit={id ?  null: handleEdit}
   handleDelete={id ?  null :handleDelete}
   /> 

  )
}

export default MyProfile