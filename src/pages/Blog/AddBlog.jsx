import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../../Utilities/Axios/UseAxios';
import axios from 'axios';

const AddBlog = () => {
     const editor = useRef(null);
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("image", file);

     const res = await axios.post(
           `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
           form
         );

    const data = await res.json();
    if (data.success) {
      setFormData({ ...formData, image: data.data.url });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = {
      ...formData,
      status: "draft",
      author: "Rokthona", 
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/blogs", blog);
      navigate("/dashboard/content-management");
    } catch (err) {
      console.error("Failed to create blog:", err);
    }
  };
    return (
          <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          className="input input-bordered w-full"
          required
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleImageUpload}
          required
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="Thumbnail"
            className="h-40 rounded object-cover"
          />
          
        )}

        <JoditEditor
          ref={editor}
          value={formData.content}
          tabIndex={1}
          onBlur={(newContent) =>
            setFormData({ ...formData, content: newContent })
          }
        />

        <button type="submit" className="btn btn-primary">Create Blog</button>
      </form>
    </div>
    );
};

export default AddBlog;