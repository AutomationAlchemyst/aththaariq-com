import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  mainImage?: any;
  slug?: { current: string };
}

// This query fetches ALL field note posts, sorted by creation date
async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "fieldNotePost"] | order(_createdAt desc){
    _id,
    title,
    excerpt,
    mainImage,
    slug
  }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function FieldNotesIndexPage() {
  const posts = await getPosts();

  return (
    <main>
      {/* HEADER SECTION - Themed for Field Notes */}
      <header className="py-20 px-6 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase text-rose-accent">Field Notes</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400">Dispatches from the front lines of breaking cycles and building an intentional life.</p>
        </div>
      </header>

      {/* POSTS GRID SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post._id} href={`/field-notes/${post.slug?.current || '#'}`} className="glass-card rounded-xl overflow-hidden group block">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title || 'Post Image'}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-800"></div>
                  )}
                  <div className="p-6">
                    {/* Themed hover color */}
                    <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-rose-accent transition-colors">{post.title}</h2>
                    <p className="text-gray-400 mb-4">{post.excerpt || 'No excerpt available.'}</p>
                    <span className="font-bold text-white hover:underline">Read Note →</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">No Field Notes have been published yet.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
