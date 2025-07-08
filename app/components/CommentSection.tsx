'use client'; // This component is interactive and needs to be a Client Component

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';

// Define the structure of a comment object, now with a name
interface Comment {
  id: string;
  name: string; // Added name field
  text: string;
  createdAt: Timestamp;
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newName, setNewName] = useState(''); // State for the name input
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const commentsQuery = query(
      collection(db, 'comments'), 
      where('postSlug', '==', slug), 
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const commentsData: Comment[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        commentsData.push({ 
          id: doc.id, 
          name: data.name || 'Anonymous', // Add a fallback for older comments
          text: data.text,
          createdAt: data.createdAt
        });
      });
      setComments(commentsData);
    }, (err) => {
      console.error("Error fetching comments:", err);
      setError("Could not load comments.");
    });

    return () => unsubscribe();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() === '' || newName.trim() === '') return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Add the new comment with the author's name
      await addDoc(collection(db, 'comments'), {
        postSlug: slug,
        name: newName,
        text: newComment,
        createdAt: serverTimestamp(),
      });
      setNewName(''); // Clear the name field
      setNewComment(''); // Clear the comment field
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-gray-700 pt-8">
      <h3 className="font-display text-3xl font-bold text-white mb-6">Join the Conversation</h3>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-accent focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-400 mb-1">Comment</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-accent focus:outline-none"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-cyan-accent text-gray-900 font-bold py-2 px-6 rounded-lg uppercase hover:bg-cyan-accent-dark transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800/50 p-4 rounded-lg">
              <p className="font-bold text-white">{comment.name}</p>
              <p className="text-gray-300 mt-1">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-2">
                {comment.createdAt ? new Date(comment.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Be the first to comment.</p>
        )}
      </div>
    </div>
  );
}
