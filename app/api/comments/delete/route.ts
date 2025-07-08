import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// --- REMOVED ---
// We no longer need to read files from the filesystem.
// import fs from 'fs';
// import path from 'path';

// --- NEW: SECURELY PARSE THE ENVIRONMENT VARIABLE ---
// This safely gets the service account JSON from the Vercel environment variables.
// It checks if the variable exists before trying to parse it.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  : null;

// Initialize the Firebase Admin SDK
// This check prevents re-initializing the app on every request.
// It also ensures we only initialize if the service account credentials are valid.
if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    console.error("Firebase Admin initialization failed: FIREBASE_SERVICE_ACCOUNT_JSON is not set.");
  }
}

const db = admin.firestore();

export async function POST(request: Request) {
  try {
    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    // Use the Admin SDK to delete the specified document
    await db.collection('comments').doc(commentId).delete();

    console.log(`Comment deleted: ${commentId}`);
    return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
