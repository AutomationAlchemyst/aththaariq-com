import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

interface CaseStudy {
  title: string;
  mainImage: any;
  problemStatement: string;
  solutionDetails: any[];
  results: any[];
}

async function getCaseStudy(slug: string): Promise<CaseStudy> {
  const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    mainImage,
    problemStatement,
    solutionDetails,
    results
  }`;
  const study = await client.fetch(query, { slug });
  return study;
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = await getCaseStudy(params.slug);

  if (!study) {
    return <div>Case study not found</div>;
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-cyan-accent mb-4">{study.title}</h1>
      
      {study.mainImage && (
        <Image
          src={urlFor(study.mainImage).url()}
          alt={study.title}
          width={1000}
          height={500}
          className="rounded-lg my-8 object-cover"
        />
      )}

      <div className="mt-12">
        <h2 className="font-display text-3xl font-bold text-white mb-4">The Problem</h2>
        <p className="text-lg text-gray-300 leading-relaxed">{study.problemStatement}</p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-3xl font-bold text-white mb-4">Our System (The Solution)</h2>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <PortableText value={study.solutionDetails} />
        </div>
      </div>

       <div className="mt-12 p-8 bg-gray-900/50 rounded-lg border border-cyan-accent/20">
        <h2 className="font-display text-3xl font-bold text-cyan-accent mb-4">The Results (Proof)</h2>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <PortableText value={study.results} />
        </div>
      </div>

      <div className="text-center mt-16">
        <Link href="/#system-audits" className="bg-rose-accent text-white font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-rose-accent-dark transition-colors duration-300">
            Back to Audits
        </Link>
      </div>
    </article>
  );
}
