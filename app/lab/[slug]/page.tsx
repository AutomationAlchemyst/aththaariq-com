import { client } from '@/sanity/client';
import { notFound } from 'next/navigation';
// === FINAL FIX: Removed the .tsx extension from the import path ===
import HustleTaxCalculator from '../../components/HustleTaxCalculator';

// Define the interface for a single Lab Project.
interface LabProject {
  _id: string;
  title: string;
  description?: string;
  slug?: { current: string };
}

// This async function fetches a SINGLE lab project based on its slug.
async function getLabProject(slug: string): Promise<LabProject> {
  const query = `*[_type == "labProject" && slug.current == $slug][0]{
    _id,
    title,
    description,
    slug
  }`;
  
  const project = await client.fetch(query, { slug });
  return project;
}

// The props for this page component will include 'params' which contains the slug from the URL.
export default async function LabProjectPage({ params }: { params: { slug: string } }) {
  const project = await getLabProject(params.slug);

  // If no project is found for the given slug, display a 404 page.
  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* HEADER SECTION */}
      <header className="py-20 px-6 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase text-cyan-accent">{project.title}</h1>
          {project.description && (
            <p className="mt-4 text-lg md:text-xl text-gray-400">{project.description}</p>
          )}
        </div>
      </header>

      {/* INTERACTIVE COMPONENT SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-8 md:p-12">
            {/* This conditionally renders the calculator only if the slug matches. */}
            {project.slug?.current === 'the-hustle-tax-calculator' ? (
              <HustleTaxCalculator />
            ) : (
              // This is a fallback for any future tools that don't have a component yet.
              <h2 className="text-2xl font-bold text-white text-center">Interactive tool for this project is under construction.</h2>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
