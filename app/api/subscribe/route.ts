import { NextResponse } from 'next/server';
// --- FIX: REMOVED local Firebase initialization ---
// We will now use the centralized and secure Firebase instance.
// import { initializeApp, getApps, getApp } from 'firebase/app';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// --- FIX: IMPORT the shared Firestore instance ---
// This centralizes your Firebase config and keeps keys out of the source code.
import { db } from '@/app/lib/firebase';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/app/components/WelcomeEmail';
import { client as sanityClient } from '@/sanity/client';

// Initialize Resend with your API key from environment variables.
// Make sure RESEND_API_KEY is set in your Vercel project settings.
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
      // It's good practice to provide a clear error message in the logs.
      console.error('Lead magnet PDF URL not found in Sanity.');
      return NextResponse.json({ error: 'The download file is currently unavailable. Please try again later.' }, { status: 500 });
    }

    // 2. Save to Firestore using the shared 'db' instance.
    // This is more secure as it uses environment variables for configuration.
    const subscribersCollection = collection(db, 'subscribers');
    await addDoc(subscribersCollection, {
      email: email,
      subscribedAt: serverTimestamp(),
    });
    console.log(`New subscriber saved to Firestore: ${email}`);

    // 3. Send the welcome email.
    // --- MAJOR FIX: Update the 'from' address ---
    // Using 'onboarding@resend.dev' is only for development and will likely
    // cause your emails to be blocked or go to spam in production.
    // You MUST use a domain that you have verified with Resend.
    // Go to your Resend dashboard -> Domains to add and verify your own domain.
    await resend.emails.send({
      from: 'Ath Thaariq <ath@aththaariq.com>', // <-- TODO: Replace with your verified domain email
      to: email,
      subject: 'Your 5-Minute Daily Automation Audit is Here!',
      react: WelcomeEmail({ email, downloadUrl }),
    });
    console.log(`Welcome email sent to: ${email}`);

    return NextResponse.json({ message: 'Success! Check your email for the download.' }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/subscribe:", error);

    // Provide a more generic error message to the user for security.
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
