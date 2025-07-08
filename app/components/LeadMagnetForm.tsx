'use client'; // This marks the component as a Client Component, allowing it to be interactive.

import { useState } from 'react';

export default function LeadMagnetForm() {
  // State variables to manage the form's data and status
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default browser form submission
    setStatus('loading');
    setMessage('');

    try {
      // Send the email to our API route
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server responds with an error, throw an error to be caught by the catch block
        throw new Error(data.error || 'Something went wrong.');
      }
      
      // On success, update the status and message
      setStatus('success');
      setMessage(data.message);
      setEmail(''); // Clear the input field

    } catch (error: any) {
      // On failure, update the status and message
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <input 
          type="email" 
          placeholder="Enter Your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-accent focus:outline-none" 
          required 
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          className="bg-cyan-accent text-gray-900 font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-cyan-accent-dark transition-colors duration-300 disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Download Now'}
        </button>
      </form>
      
      {/* Conditionally render success or error messages below the form */}
      {status === 'success' && <p className="mt-4 text-green-400">{message}</p>}
      {status === 'error' && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
