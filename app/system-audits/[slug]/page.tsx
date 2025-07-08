import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import LikeButton from '@/app/components/LikeButton';
import CommentSection from '@/app/components/CommentSection';

interface Post {
  title: string;
  mainImage: any;
  body: any[];
}

async function getPost(slug: string): Promise<Post> {
  const query = `*[_type == "systemAuditPost" && slug.current == $slug][0]{
    title,
    mainImage,
    body
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

export default async function SystemAuditPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-cyan-accent mb-4">{post.title}</h1>
      
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-lg my-8 object-cover"
        />
      )}

      <div className="prose prose-invert prose-lg max-w-none text-gray-300">
        <PortableText value={post.body} />
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4">
        <LikeButton slug={params.slug} />
      </div>

      <CommentSection slug={params.slug} />
    </article>
  );
}
