import React, { useEffect, useState } from 'react';

import useAxios from '../../Utilities/Axios/UseAxios';
import { useParams } from 'react-router';

const BlogDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosSecure.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, axiosSecure]);

  if (loading) {
    return <div className="text-center py-10">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="text-center py-10 text-red-500">Blog not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <div
        className="prose max-w-full p-2"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <p className="mt-6 text-sm text-gray-500">Status: {blog.status}</p>
    </div>
  );
};

export default BlogDetail;
