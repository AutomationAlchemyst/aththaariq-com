'use client'; // This must be a Client Component because it's interactive

import { useState, useEffect } from 'react';
// This is the new, more direct import path.
// From `app/components`, it just goes up one level to `app/` and then into `lib/`.
import { db } from '../lib/firebase';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { Heart } from 'lucide-react';

export default function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create a unique ID for the document in Firestore using the post's slug
  const docId = `post_likes_${slug}`;

  useEffect(() => {
    // Check localStorage to see if this user has already liked the post in this browser
    const likedInStorage = localStorage.getItem(docId);
    if (likedInStorage === 'true') {
      setIsLiked(true);
    }

    // Fetch the initial like count from Firestore
    const getLikes = async () => {
      const docRef = doc(db, 'likes', docId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLikes(docSnap.data().count);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getLikes();
  }, [docId]);

  const handleLike = async () => {
    // Prevent multiple clicks or liking if already liked
    if (isLiked || isLoading) return;

    setIsLiked(true);
    setLikes(prevLikes => prevLikes + 1); // Optimistic update for instant feedback
    localStorage.setItem(docId, 'true'); // Remember the user's action

    // Use a transaction to safely update the count on the server
    try {
      const docRef = doc(db, 'likes', docId);
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          // If the document doesn't exist, create it with 1 like
          transaction.set(docRef, { count: 1 });
        } else {
          // Otherwise, increment the existing count
          const newCount = sfDoc.data().count + 1;
          transaction.update(docRef, { count: newCount });
        }
      });
    } catch (e) {
      console.error("Like transaction failed: ", e);
      // If the server update fails, revert the local changes
      setIsLiked(false);
      setLikes(prevLikes => prevLikes - 1);
      localStorage.removeItem(docId);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiked || isLoading}
      className={`mt-8 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isLiked 
          ? 'bg-rose-500 text-white cursor-not-allowed' 
          : 'bg-gray-800 hover:bg-rose-500 text-gray-300 hover:text-white'
        }
        disabled:opacity-70`}
    >
      <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
      <span>{isLoading ? '...' : likes}</span>
    </button>
  );
}
