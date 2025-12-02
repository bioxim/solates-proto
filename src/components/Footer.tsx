export default function Footer() {
  return (
    <footer className="w-full text-center py-6 text-sm text-white/60 mt-20 border-t border-white/10">
      <p>© {new Date().getFullYear()} Solates — All rights reserved.</p>

      <div className="flex justify-center gap-4 mt-2">

        {/* ACTIVE */}
        <a
          href="https://x.com/SolatesDefi"
          target="_blank"
          className="hover:text-[var(--primary)]"
        >
          X (Twitter)
        </a>

        {/* TODO: enable later
        <a href="#" className="hover:text-[var(--primary)]">Docs</a>
        <a href="#" className="hover:text-[var(--primary)]">Terms</a>
        */}
      </div>
    </footer>
  );
}
