import { createClient } from '@sanity/client'

// This configuration object holds the connection details for your Sanity project.
const clientConfig = {
  // You can find your project ID and dataset in your `sanity.config.ts` file
  projectId: '2w7mkfb7',
  dataset: 'production',
  apiVersion: '2024-07-04', // Use a recent date
  useCdn: false, // `false` if you want to ensure fresh data
}

// Create the client instance with the configuration
export const client = createClient(clientConfig);
