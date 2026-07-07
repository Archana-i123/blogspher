import React, { useState } from "react";
import api from "../api/api";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/posts", form);
      alert(res.data.message);
      setForm({ title: "", content: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Post Create Failed");
      console.log("POST CREATE ERROR", err);
    }
  };

  return (
    <div className="p-6">
      <form
        className="bg-white p-5 rounded-xl shadow max-w-lg"
        onSubmit={createPost}
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="content"
          className="w-full border p-2 mb-3 roudned"
          placeholder="Enter content"
          value={form.content}
          onChange={handleChange}
        ></textarea>

        <button className="w-full bg-black text-white py-2 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;