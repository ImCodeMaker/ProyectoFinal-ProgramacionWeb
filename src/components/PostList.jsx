import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          content: data.content,
          imageUrl: data.imageUrl || '',
          authorName: data.authorName || 'Anonymous',
          timestamp: data.createdAt ? data.createdAt.toDate() : new Date() 
        };
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="posts-container">
      <h2 className="posts-title">Posts</h2>
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet. Be the first to share something!</p>
        </div>
      ) : (
        posts.map(post => (
          <article key={post.id} className="post">
            <div className="post-header">
              <span className="post-username">@{post.authorName}</span> {/* FIX */}
              <span className="post-timestamp">{formatDate(post.timestamp)}</span>
            </div>
            <div className="post-content">{post.content}</div>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
          </article>
        ))
      )}
    </div>
  );
}

export default PostList;
