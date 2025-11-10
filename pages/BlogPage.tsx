// src/pages/BlogPage.tsx
import React, { useState, useEffect } from 'react';
import { getBlogPosts, BlogPost } from '../services/api';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  if (error)
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-md my-8 container mx-auto">
        {error}
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight font-serif">
            From Our Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore stories, insights, and tips from our team — crafted to inspire and inform.
          </p>
        </div>

        {/* No Posts */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-xl py-10">No blog posts yet. Stay tuned!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="overflow-hidden h-64">
                  <img
                    src={`${API_BASE_URL}/${post.imageUrl}`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-secondary transition-colors duration-300 font-serif">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed flex-grow line-clamp-4">
                    {post.content}
                  </p>

                  <div className="mt-5">
<Link
  to={`/blog/${post._id}`}
  className="inline-flex items-center gap-1 text-secondary font-semibold group-hover:gap-2 transition-all duration-300"
>
  Read More →
</Link>

                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
