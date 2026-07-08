import React, { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({title: "", content: ""});

  const getPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data.posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

const hanleEditChange = (e) => {
  const newForm = { ...editForm, [e.target.name]: e.target.value};
  setEditForm(newForm);
};
 
const handleEditClick =(post) =>{
  setEditId(post._id);
  setEditForm({title: post.title,content: post.content});
}

const handleCancel = ()=>{
  setEditId(null);
  setEditForm({title: "", content: ""})
}
const handleUpdate =async (id) => {
  try{
   const res =  await api.put(` /posts/update/${id}`,editForm);
   alert(res.data.message);
   handleCancel();
  }
  catch(err){
    alert(err.response?.data?.message || "Update Failed");
    console.log("Unable to post",err);
    
  }
};

const hasndleDelete =async(id)=> {
  const confirmDelete = confirm("Are you sour ?");
  if(!confirmDelete) return;

    try{
     const res = await api.delete(`/posts/delete/${id}`);
     alert(res.data.message);
     getPosts();
    }
    catch(err){
      alert(err.response?.data?.message || "Unable to Delete");
      console.log("Unable  to Delete",err);
      
    }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">All Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post._id } className="bg-white shadow p-4 rounded-xl border">
            {editId === post._id ?  (<>
            <input type="text" name="title" value={editForm.title} onChange={handleEditChange} className="w-full border p-2 mb-3 rounded"/>
            <textarea name="content" value={editForm.content} onChange={handleEditChange} className="w-full border p-2 mb-3 rounded"></textarea>
            <div className="flex-gap-3">
              <button className="bg-green-600 text-white px-4 py-2" onClick={handleUpdate(post._id)}>update</button>
              <button className="bg-green-600 text-white px-4 py-2" 
              onClick={(handleCancel)}>Cancel</button>
            </div>
            </>
              ) : (
             <>
             <h1 className="text-xl font-extrabold">{post.title}</h1>
            <p className="text-gray-600">{post.content}</p>
            <p className="text-sm mt-2">By : {post.user?.name}</p>
            <div className="flex gap-3">
            <button className="bg-blue-600 text-white p-4 py-2 rounded"
              onClick={()=>{
                handleEditClick(post);
              }}>
            Edit</button>
             <button className="bg-red-600 text-white p-4 py-2 rounded"
              onClick={()=>{
              handleDelete(post._id);
             }}>
            Delete</button>
            </div>
            </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
