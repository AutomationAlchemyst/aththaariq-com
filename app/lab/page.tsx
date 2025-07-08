import { client } from '@/sanity/client';
import Link from 'next/link';

// Define the interface for a Lab Project, ensuring type safety.
interface LabProject {
  _id: string;
  title: string;
  description?: string;
  slug?: { current: string };
}

// This async function fetches all documents of the type 'labProject' from Sanity.
// It orders them by their creation date to show the newest projects first.
async function getLabProjects(): Promise<LabProject[]> {
  const query = `*[_type == "labProject"] | order(_createdAt desc){
    _id,
    title,
    description,
    slug
  }`;
  const projects = await client.fetch(query);
  return projects;
}

// The main component for the Project Lab index page.
export default async function ProjectLabIndexPage() {
  const projects = await getLabProjects();

  return (
    <main>
      {/* HEADER SECTION */}
      {/* This header uses the brand's voice, framing the section as a "Lab" or "Armory" */}
      {/* as suggested in the Phase 3 deep dive document. */}
      <header className="py-20 px-6 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase text-cyan-accent">The Project Lab</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400">This is the armory. Live, interactive tools forged to fight chaos and demonstrate the power of a well-built system. This is where we show, not just tell.</p>
        </div>
      </header>

      {/* PROJECTS GRID SECTION */}
      {/* This section displays the fetched projects in a clean, card-based grid. */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                // Each card is a link to the specific tool's page.
                <Link key={project._id} href={`/lab/${project.slug?.current || '#'}`} className="glass-card rounded-xl overflow-hidden group block p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-cyan-accent transition-colors">{project.title}</h2>
                    <p className="text-gray-400 mb-4">{project.description || 'No description available.'}</p>
                  </div>
                  <span className="font-bold text-white hover:underline mt-4 self-start">Open Tool →</span>
                </Link>
              ))
            ) : (
              // A fallback message if no projects have been published yet.
              <p className="text-gray-400 col-span-full text-center">No projects have been added to the lab yet. Check back soon.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
