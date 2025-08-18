import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function CreatePost({ currentUser, onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('You must be logged in to create a post.');
      return;
    }

    if (!content.trim()) return alert('Escribe algo para publicar.');

    setLoading(true);
    let imageUrl = '';

    try {
      if (image) {
        const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'posts'), {
        content: content.trim(),
        imageUrl,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous',
        createdAt: serverTimestamp()
      });

      setContent('');
      setImage(null);
      alert('Post publicado!');
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error('Error creando post:', error);
      alert(`Hubo un error al publicar: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            What's on your mind?
          </label>
          <textarea
            id="content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            maxLength={500}
            required
          />
          <small style={{ color: '#888', fontSize: '12px' }}>
            {content.length}/500 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Optional Image
          </label>
          <input 
            type="file" 
            id="image" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>

        <button 
          type="submit" 
          className="form-submit"
          disabled={loading || !content.trim()}
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
