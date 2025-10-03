export default function Footer() {
  return (
    <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <span>© {new Date().getFullYear()} Solates — All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">Twitter</a>
          <a href="#" className="hover:text-primary">Discord</a>
          <a href="#" className="hover:text-primary">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
