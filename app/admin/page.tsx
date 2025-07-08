'use client'; // This is an interactive admin dashboard

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

interface Comment {
  id: string;
  name: string; // Added name field
  text: string;
  postSlug: string;
  createdAt: Timestamp;
}

export default function AdminPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const commentsQuery = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const commentsData: Comment[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        commentsData.push({
          id: doc.id,
          name: data.name || 'Anonymous', // Add a fallback
          text: data.text,
          postSlug: data.postSlug,
          createdAt: data.createdAt,
        });
      });
      setComments(commentsData);
      setIsLoading(false);
    }, (err) => {
      console.error("Error fetching comments for admin:", err);
      setError("Could not load comments.");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (commentId: string) => {
    if (typeof window !== 'undefined' && !window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const response = await fetch('/api/comments/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting comment.');
    }
  };

  if (isLoading) {
    return <div className="text-center p-12">Loading comments...</div>;
  }
  
  if (error) {
    return <div className="text-center p-12 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="font-display text-4xl font-bold text-white mb-8">Comment Moderation</h1>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-4 rounded-lg flex items-start justify-between">
              <div>
                <p className="font-bold text-cyan-accent">{comment.name}</p>
                <p className="text-gray-300 mt-1">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-2">
                  On post: <span className="font-mono">{comment.postSlug}</span>
                  {' | '}
                  {comment.createdAt ? new Date(comment.createdAt.seconds * 1000).toLocaleString() : ''}
                </p>
              </div>
              <button 
                onClick={() => handleDelete(comment.id)}
                className="bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-700 transition-colors ml-4 flex-shrink-0"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments to moderate yet.</p>
        )}
      </div>
    </div>
  );
}
