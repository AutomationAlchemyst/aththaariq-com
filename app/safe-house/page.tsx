import { client } from '@/sanity/client';
import { BookHeart } from 'lucide-react';

interface Resource {
  _id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
}

// This query fetches all resources and the URL for their attached file
async function getResources(): Promise<Resource[]> {
  const query = `*[_type == "safeHouseResource"]{
    _id,
    title,
    description,
    category,
    "fileUrl": resourceFile.asset->url
  }`;
  const resources = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return resources;
}

// A helper function to group resources by their category
function groupByCategory(resources: Resource[]) {
  return resources.reduce((acc, resource) => {
    const category = resource.category || 'uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);
}

// A helper object to display category titles nicely
const categoryTitles: Record<string, string> = {
  conversations: 'For Difficult Conversations',
  trust: 'For Building Trust',
  stress: 'For Managing Family Stress',
  finance: 'For Financial Independence',
};

export default async function SafeHouseLibraryPage() {
  const resources = await getResources();
  const groupedResources = groupByCategory(resources);

  return (
    <main>
      {/* HEADER SECTION */}
      <header className="py-20 px-6 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase text-rose-accent">The Safe House Library</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400">A collection of tools and systems for building a more intentional life. Offered freely, from my family to yours.</p>
        </div>
      </header>

      {/* RESOURCES SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {Object.keys(groupedResources).map((category) => (
            <div key={category}>
              <h2 className="font-display text-3xl font-bold text-white border-b-2 border-rose-500/30 pb-2 mb-8">
                {categoryTitles[category] || 'General Resources'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedResources[category].map((resource) => (
                  <div key={resource._id} className="glass-card rounded-xl p-6 flex flex-col">
                    <BookHeart className="w-8 h-8 text-rose-accent mb-4" />
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-400 flex-grow mb-6">{resource.description}</p>
                    <a 
                      href={resource.fileUrl} 
                      download 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto block w-full text-center bg-rose-accent text-white font-bold py-2 px-4 rounded-lg uppercase hover:bg-rose-accent-dark transition-colors"
                    >
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
