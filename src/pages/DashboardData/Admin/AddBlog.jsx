import React, { useRef, useState } from 'react';
import useAxios from '../../../Utilities/Axios/UseAxios';
import { useNavigate } from 'react-router';
import { Button } from '../../../Components/Ui/Button';
import JoditEditor from 'jodit-react';
const AddBlog = () => {
     const axiosSecure = useAxios();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleThumbnailUpload = async () => {
    const formData = new FormData();
    formData.append('image', thumbnail);

    const res = await axiosSecure.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`,
      formData
    );

    return res.data?.data?.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleThumbnailUpload();
      const blogData = {
        title,
        content,
        thumbnail: imageUrl,
        status: 'draft', // default
        createdAt: new Date(),
      };

      await axiosSecure.post('/blogs', blogData);
      navigate('/dashboard/content-management');
    } catch (err) {
      console.error('Failed to add blog:', err);
    } finally {
      setLoading(false);
    }
  };

    return (
         <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">📝 Add Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            config={{
              height: 400,
            }}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Blog'}
        </Button>
      </form>
    </div>
    );
};

export default AddBlog;