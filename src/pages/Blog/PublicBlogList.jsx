import React, { useEffect, useState } from 'react';

import useAxios from '../../Utilities/Axios/UseAxios';
import { Link } from 'react-router';

const PublicBlogList = () => {
  const axiosSecure = useAxios();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get('/blogs', {
          params: { status: 'published' }
        });
        setBlogs(res.data.blogs || res.data);
      } catch (err) {
        console.error('Failed to load blogs', err);
      }
    };

    fetchBlogs();
  }, []);
console.log(blogs)
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">📰 Latest Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="card bg-base-100 border shadow">
            <figure>
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{blog.title}</h3>
              <p className="text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
              <Link to={`/blog/${blog._id}`} className="btn btn-primary btn-sm mt-3">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicBlogList;
