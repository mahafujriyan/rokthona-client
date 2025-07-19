import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../../Utilities/Axios/UseAxios';

const ContentManagement = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const userRole = localStorage.getItem('user-role') || 'donor';

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (filterStatus !== 'all') params.status = filterStatus;

      const res = await axiosSecure.get('/blogs', { params });
      setBlogs(res.data.blogs || res.data);
      if (res.data.totalPages) setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Blog fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filterStatus, page]);

 

  const handlePublishToggle = async (blog) => {
    if (userRole !== 'admin') return alert('Only admins can change status.');

    try {
      const newStatus = blog.status === 'draft' ? 'published' : 'draft';
      await axiosSecure.patch(`/blogs/${blog._id}/status`, { status: newStatus });
      fetchBlogs();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== 'admin') return alert('Only admins can delete.');
    if (!confirm('Are you sure?')) return;

    try {
      await axiosSecure.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-6">
        <h2 className="text-xl font-semibold">📝 Content Management</h2>
        <Link to='/dashboard/content-management-addBlog' className="btn btn-primary btn-sm w-full sm:w-auto">
          ➕ Add Blog
        </Link>
      </div>

      <div className="mb-4">
        <select
          className="select select-bordered w-full sm:w-48"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No blogs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="card bg-base-100 shadow-sm border">
              <figure>
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="h-48 w-full object-cover rounded-t"
                />
              </figure>
              <div className="card-body flex flex-col">
                <h3 className="card-title">{blog.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span
                    className={`badge px-3 ${
                      blog.status === 'published' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {blog.status}
                  </span>

                  {userRole === 'admin' && (
                    <div className="space-x-1">
                      <button
                        onClick={() => handlePublishToggle(blog)}
                        className="btn btn-sm btn-info"
                      >
                        {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-10 gap-2">
          <button
            className="btn btn-outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-outline ${page === i + 1 ? 'btn-active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
