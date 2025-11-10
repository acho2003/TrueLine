import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPosts, BlogPost } from '../services/api';
import Spinner from '../components/Spinner';

const API_BASE_URL = 'http://localhost:5000';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const allPosts = await getBlogPosts();
        const selectedPost = allPosts.find((p) => p._id === id);
        if (!selectedPost) throw new Error('Post not found');
        setPost(selectedPost);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  if (error) return <div className="text-center text-red-500 bg-red-100 p-4 rounded-md my-8">{error}</div>;

  if (!post) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/blog" className="text-secondary font-semibold mb-6 inline-block hover:underline">
          ← Back to Blog
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <img
          src={`${API_BASE_URL}/${post.imageUrl}`}
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl shadow-md mb-8"
        />

        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
