import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Import your service account key
// The `fs` module is used to read the file from your server
import fs from 'fs';
import path from 'path';

// Path to your service account key file
const serviceAccountPath = path.resolve('./firebase-service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize the Firebase Admin SDK
// This check prevents re-initializing the app on every request
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
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
