import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 relative z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-display text-xl font-bold text-white">
          Ath Thaariq
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 text-sm">
          <Link href="/system-audits" className="text-gray-300 hover:text-cyan-accent transition-colors">
            System Audits
          </Link>
          <Link href="/field-notes" className="text-gray-300 hover:text-rose-accent transition-colors">
            Field Notes
          </Link>
          {/* === LINK REORDERED HERE === */}
          <Link href="/lab" className="text-gray-300 hover:text-cyan-accent transition-colors">
            Project Lab
          </Link>
          <Link href="/safe-house" className="text-gray-300 hover:text-rose-accent transition-colors">
            Safe House
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
