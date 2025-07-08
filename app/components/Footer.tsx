export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto py-8 px-6 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8">
          <p className="font-bold text-cyan-accent text-lg">Built by WorkFlowGuys</p>
          <div className="w-px h-6 bg-gray-700 hidden sm:block"></div>
          <p className="font-bold text-rose-accent text-lg">For Hana, Haris, and Aisha</p>
        </div>
        <div className="mt-8 text-gray-500">
          <p>© 2025 Ath Thaariq. All Rights Reserved. Singapore.</p>
        </div>
      </div>
    </footer>
  );
}
