export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
        Welcome to <span className="text-primary">Solates</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-8">
        Your mate in blockchain — making crypto simple.
      </p>
      <button className="px-6 py-3 rounded-lg bg-primary text-white text-lg font-semibold hover:opacity-90">
        Get Started
      </button>
    </div>
  );
}
