export default function Airdrop() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        $OLA Airdrop
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Claim your $OLA tokens by participating in Solates activities.
      </p>

      <div className="bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Your Eligibility
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Connect your wallet to check if you are eligible for the airdrop.
        </p>
        <button className="mt-6 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
