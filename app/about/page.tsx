import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';

interface AboutContent {
  heroImage?: any;
  whySectionImage?: any;
}

async function getAboutContent(): Promise<AboutContent> {
  const query = `*[_type == "aboutPage"][0]{ heroImage, whySectionImage }`;
  // We add a revalidation rule to the fetch options.
  // This tells Next.js to check for new data every 30 seconds.
  const content = await client.fetch(
    query, 
    {}, 
    { next: { revalidate: 30 } }
  );
  return content || {};
}

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      {/* HERO SECTION - Now Dynamic */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center p-6 -mt-20">
        <div className="absolute inset-0 z-0">
          {content.heroImage ? (
            <Image 
              src={urlFor(content.heroImage).url()}
              alt="Authentic portrait of Ath Thaariq" 
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          ) : (
            <div className="bg-gray-800 w-full h-full"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        <div className="z-10 max-w-4xl">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">I build systems to fight chaos—in business, and in life.</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400">Because the best workflows give you the freedom to be present for what truly matters.</p>
        </div>
      </section>

      {/* ORIGIN STORY SECTION */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-rose-accent mb-6 text-center">Every Rebel Has a Cause.</h2>
          <div className="text-lg text-gray-300 space-y-6 leading-relaxed">
            <p>My story begins with a broken system. I remember standing next to my father at 2 AM, multiplication book in hand, trying to memorize tables while he watched TV. I remember the pinch marks. I remember bringing home a 99/100 test score, proud, only to be punished for the one "silly mistake."</p>
            <p>Love was conditional. Discipline was pain. The system taught me that my worth was tied to my performance, and that perfection was the only acceptable standard.</p>
            <p>I remember watching my mother, a survivor, finally break free from a decade of shouting and violence. I remember being shuffled between homes, a kid caught in a court order that made no sense. Since then, I’ve never fully trusted "the system." How could I?</p>
            <p>That distrust fueled a rebellion. It led me to question authority that valued rank over people. It sent me searching for solace in places and friendships that, in retrospect, were just other broken systems. I learned the hard way that vulnerability given to the wrong people becomes a weapon against you.</p>
            <p>My rebellion wasn't loud or destructive. It was a quiet, determined search for something better. A search for a system that worked.</p>
          </div>
        </div>
      </section>

      {/* TWO-FRONT WAR SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="glass-card rounded-xl p-8">
            <h3 className="font-display text-3xl font-bold text-cyan-accent mb-4">The Architect: Waging War on Chaotic Work</h3>
            <p className="text-lg text-gray-300 leading-relaxed">My obsession with AI and automation isn't just about technology. It's a direct response to my past. I build elegant, efficient workflows for businesses because I know the true cost of chaos. I know what it feels like to have no control.</p>
            <p className="text-lg text-gray-300 mt-4 leading-relaxed">Through <a href="https://theworkflowguys.com" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-cyan-accent">WorkFlowGuys</a>, I give businesses the systems I never had: clear, logical, and designed to give people back their most valuable asset—time. When a process is automated and a system is seamless, it creates freedom. It replaces anxiety with control and burnout with potential.</p>
          </div>
          <div className="glass-card rounded-xl p-8">
            <h3 className="font-display text-3xl font-bold text-rose-accent mb-4">The Cycle Breaker: Building a Safe House</h3>
            <p className="text-lg text-gray-300 leading-relaxed">That same fight for control extends to the most important system of all: my family. I met my wife, Hasinah, when we were perhaps two broken souls looking for a way out. We started with nothing and built everything from scratch, bonded by our shared scars.</p>
            <p className="text-lg text-gray-300 mt-4 leading-relaxed">Now, as a father, my rebellion has a new, fiercer purpose. I am building a legacy that actively dismantles the one I was given. I am creating a system of unconditional love and psychological safety for my children, Hana and Haris.</p>
          </div>
        </div>
      </section>

      {/* THE "WHY" SECTION - Now Dynamic */}
      <section className="relative py-24 px-6 text-center">
        <div className="absolute inset-0 z-0">
          {content.whySectionImage ? (
            <Image 
              src={urlFor(content.whySectionImage).url()}
              alt="Authentic photo of family" 
              layout="fill"
              objectFit="cover"
              className="opacity-10"
            />
          ) : (
            <div className="bg-gray-800 w-full h-full"></div>
          )}
          <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
            "I build systems so I never miss a moment. I automate workflows so I can be at the dinner table. I fight for efficiency so I can have the freedom to be the husband and father they deserve. Everything I build is for them."
          </p>
        </div>
      </section>

      {/* INVITATION / CTA SECTION */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white">Join the Fight.</h2>
          <p className="text-lg text-gray-400 mt-4">Whether you're looking to fix a broken system in your business or seeking to build a more intentional life, the principles are the same. Let's start building.</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/system-audits" className="w-full sm:w-auto bg-cyan-accent text-gray-900 font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-cyan-accent-dark transition-colors duration-300">
              Audit Your Systems
            </Link>
            <Link href="/field-notes" className="w-full sm:w-auto bg-rose-accent text-white font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-rose-accent-dark transition-colors duration-300">
              Read the Field Notes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
