import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
// 1. Import the new component
import LeadMagnetForm from '@/app/components/LeadMagnetForm';

interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  mainImage?: any;
  slug?: { current: string };
}

interface CaseStudyTeaser {
  _id: string;
  title: string;
  excerpt?: string;
  mainImage?: any;
  slug?: { current: string };
}

async function getLatestSystemAudit(): Promise<Post | null> {
  const query = `*[_type == "systemAuditPost"] | order(_createdAt desc)[0]{_id, title, excerpt, mainImage, slug}`;
  const post = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return post;
}

async function getLatestFieldNote(): Promise<Post | null> {
  const query = `*[_type == "fieldNotePost"] | order(_createdAt desc)[0]{_id, title, excerpt, mainImage, slug}`;
  const post = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return post;
}

async function getLatestCaseStudy(): Promise<CaseStudyTeaser | null> {
  const query = `*[_type == "caseStudy"] | order(_createdAt desc)[0]{_id, title, excerpt, mainImage, slug}`;
  const study = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return study;
}

export default async function HomePage() {
  const systemAudit = await getLatestSystemAudit();
  const fieldNote = await getLatestFieldNote();
  const caseStudy = await getLatestCaseStudy();

  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center text-center p-6 -mt-20">
        <div className="absolute inset-0 bg-gray-900 opacity-50 z-0"></div>
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-accent/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-rose-accent/10 rounded-full filter blur-3xl animate-pulse [animation-delay:4000ms]"></div>
        
        <div className="z-10">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-cyan-accent">Stop Fighting Chaos.</h1>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-rose-accent mt-2">Start Building Systems.</h2>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">A blueprint for your business, a legacy for your life.</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/system-audits" className="w-full sm:w-auto bg-cyan-accent text-gray-900 font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-cyan-accent-dark transition-colors duration-300">
              Explore the Systems
            </Link>
            <Link href="/field-notes" className="w-full sm:w-auto bg-rose-accent text-white font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-rose-accent-dark transition-colors duration-300">
              Read the Story
            </Link>
          </div>
        </div>
      </section>

      {/* DYNAMIC DUALITY SHOWCASE */}
      <section id="duality-showcase" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <div id="system-audits" className="glass-card rounded-xl p-8">
            <h3 className="font-display text-4xl font-bold text-cyan-accent mb-4">For Your Business</h3>
            <p className="text-lg text-gray-400 mb-6">Waging war on chaotic work with AI, automation, and ruthlessly efficient systems.</p>
            <div className="space-y-4">
              <h4 className="font-display text-xl font-bold border-b border-gray-700 pb-2 mb-4">Latest System Audit</h4>
              <div className="bg-gray-900/50 p-6 rounded-lg">
                {systemAudit && systemAudit.mainImage ? (
                  <Image src={urlFor(systemAudit.mainImage).url()} alt={systemAudit.title || 'System Audit Image'} width={600} height={400} className="rounded-md mb-4 aspect-video object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-800 rounded-md mb-4 flex items-center justify-center"><p className="text-gray-500">No Image</p></div>
                )}
                {systemAudit ? (
                  <>
                    <h5 className="font-display text-2xl font-bold text-white">{systemAudit.title}</h5>
                    <p className="text-gray-400 mt-2">{systemAudit.excerpt || 'No excerpt available.'}</p>
                    <Link href={`/system-audits/${systemAudit.slug?.current || '#'}`} className="inline-block mt-4 font-bold text-cyan-accent hover:underline">Read the Audit →</Link>
                  </>
                ) : (
                  <p className="text-gray-400">No System Audits found.</p>
                )}
              </div>
            </div>
          </div>

          <div id="field-notes" className="glass-card rounded-xl p-8">
            <h3 className="font-display text-4xl font-bold text-rose-accent mb-4">For Your Life</h3>
            <p className="text-lg text-gray-400 mb-6">Breaking the cycle of broken systems by building a legacy of presence, safety, and love.</p>
            <div className="space-y-4">
              <h4 className="font-display text-xl font-bold border-b border-gray-700 pb-2 mb-4">Latest Field Note</h4>
              <div className="bg-gray-900/50 p-6 rounded-lg">
                {fieldNote && fieldNote.mainImage ? (
                  <Image src={urlFor(fieldNote.mainImage).url()} alt={fieldNote.title || 'Field Note Image'} width={600} height={400} className="rounded-md mb-4 aspect-video object-cover" />
                ) : (
                   <div className="w-full h-48 bg-gray-800 rounded-md mb-4 flex items-center justify-center"><p className="text-gray-500">No Image</p></div>
                )}
                {fieldNote ? (
                  <>
                    <h5 className="font-display text-2xl font-bold text-white">{fieldNote.title}</h5>
                    <p className="text-gray-400 mt-2">{fieldNote.excerpt || 'No excerpt available.'}</p>
                    <Link href={`/field-notes/${fieldNote.slug?.current || '#'}`} className="inline-block mt-4 font-bold text-rose-accent hover:underline">Read the Note →</Link>
                  </>
                ) : (
                  <p className="text-gray-400">No Field Notes found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET SECTION */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Find Your Profit Leaks in 5 Minutes.</h2>
          <p className="text-lg text-gray-400 mt-4">Steal the exact checklist I use to find and eliminate time-wasting tasks and foundational risks in any business. Stop guessing. Start knowing.</p>
          {/* 2. Use the new component here */}
          <LeadMagnetForm />
        </div>
      </section>

      {/* DYNAMIC CASE STUDY TEASER */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Case Study: Proof, Not Promises.</h2>
          <p className="text-lg text-gray-400 mb-8">We don't just talk theory. We build systems that deliver results.</p>
          {caseStudy ? (
            <div className="glass-card rounded-xl p-8 text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {caseStudy.mainImage ? (
                <Image src={urlFor(caseStudy.mainImage).url()} alt={caseStudy.title || 'Case Study Image'} width={800} height={600} className="rounded-lg" />
              ) : (
                <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center"><p className="text-gray-500">No Image</p></div>
              )}
              <div>
                <h3 className="font-display text-3xl font-bold text-white">{caseStudy.title}</h3>
                <p className="text-gray-400 mt-4">{caseStudy.excerpt || 'No excerpt available.'}</p>
                <Link href={`/case-studies/${caseStudy.slug?.current || '#'}`} className="inline-block mt-6 bg-rose-accent text-white font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-rose-accent-dark transition-colors duration-300">See the Breakdown</Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No Case Studies found.</p>
          )}
        </div>
      </section>
    </>
  );
}
