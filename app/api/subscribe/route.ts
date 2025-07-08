import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
// 1. Import Resend and your email template
import { Resend } from 'resend';
import { WelcomeEmail } from '@/app/components/WelcomeEmail';
// Import the Sanity client
import { client as sanityClient } from '@/sanity/client';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCda0nEy54TLknkQGVbvybcgY6f4_dsjvc",
  authDomain: "aththaariq-com.firebaseapp.com",
  projectId: "aththaariq-com",
  storageBucket: "aththaariq-com.appspot.com",
  messagingSenderId: "346852623967",
  appId: "1:346852623967:web:be810578ad205ca2acfdea",
  measurementId: "G-CB5CF1J65L"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);

// 2. Initialize Resend with your API key from the .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to get the PDF URL from Sanity
async function getPdfUrl(): Promise<string | null> {
  const query = `*[_type == "leadMagnet"][0]{ "url": auditFile.asset->url }`;
  const result = await sanityClient.fetch(query);
  return result?.url;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Get the PDF URL from Sanity
    const downloadUrl = await getPdfUrl();
    if (!downloadUrl) {
      throw new Error('Could not find the lead magnet PDF in the CMS.');
    }

    // 2. Save to Firestore
    const subscribersCollection = collection(db, 'subscribers');
    await addDoc(subscribersCollection, {
      email: email,
      subscribedAt: serverTimestamp(),
    });
    console.log(`New subscriber saved to Firestore: ${email}`);

    // 3. Send the welcome email with the correct download link
    await resend.emails.send({
      from: 'Ath Thaariq <onboarding@resend.dev>',
      to: email,
      subject: 'Your 5-Minute Daily Automation Audit is Here!',
      // Pass the URL to the email template
      react: WelcomeEmail({ email, downloadUrl }),
    });
    console.log(`Welcome email sent to: ${email}`);

    return NextResponse.json({ message: 'Success! Check your email for the download.' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
