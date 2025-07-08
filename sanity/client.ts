import { createClient } from '@sanity/client'

// This configuration object now reads its values from environment variables.
// This is a security best practice and is essential for deployment.
const clientConfig = {
  // These variables are pulled from your .env.local file in development,
  // and from the Vercel dashboard environment variables in production.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false, // `false` if you want to ensure fresh data
}

// Create the client instance with the configuration
export const client = createClient(clientConfig);
