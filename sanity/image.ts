import imageUrlBuilder from '@sanity/image-url'
import { client } from './client' // Import your Sanity client

// Create an instance of the image URL builder
const builder = imageUrlBuilder(client)

// This helper function takes a Sanity image source and returns a URL
export function urlFor(source: any) {
  return builder.image(source)
}
