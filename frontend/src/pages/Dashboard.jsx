import React, { useEffect, useState } from 'react'
import api from"../api/api"

function Dashboard() {
  const [post,setPosts]=useState([]);
    const getconsts =async()=>{
      const res =await api.get("/posts");
        setPosts(res.data.posts);
    };
    useEffect(()=>{
      getPosts();
    },[name])
  return (
       <div className='p-6'>
        <h1 className='text-3xl font-bold mb-5'>All posts</h1>
        <div className='grid gap-4'>
          {posts.map((post)=>{
            <div className='bg-white shadow p-4 rounded-xl'>
               <h1 className='text-xl font-extrabold'>{post.title}</h1>
               <p className='text-gray-600'>
                  {post.content}
               </p>
               <p className='text-sm mt-2'>
                By :{post.user?.name}
               </p>
            </div>
          })}
        </div>
       </div>
  )
}

export default Dashboard