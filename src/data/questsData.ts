export interface Question {
  q: string;
  options: string[];
  answer: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  stage: "initial" | "intermediate" | "advanced";
  type: "text" | "video" | "quiz" | "mixed";
  reward: number;
  contentUrl?: string;
  imageUrl?: string;
  questions?: Question[];
}

export const questsData: Quest[] = [
  // 🟢 INITIAL STAGE (10 XP each)
  {
    id: "q1",
    title: "What is Blockchain?",
    description: "Discover the foundation of decentralized technology and how it changes the world.",
    stage: "initial",
    type: "quiz",
    reward: 10,
    contentUrl: "https://www.youtube.com/embed/SSo_EIwHSd4",
    questions: [
      {
        q: "What is the main feature of blockchain?",
        options: ["Centralized data control", "Decentralized and transparent ledger", "Private database", "Only for cryptocurrencies"],
        answer: 1,
      },
    ],
  },
  {
    id: "q2",
    title: "Bitcoin Basics",
    description: "Learn the fundamentals of the first cryptocurrency and how Proof of Work secures it.",
    stage: "initial",
    type: "text",
    reward: 10,
    imageUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    id: "q3",
    title: "Ethereum Evolution",
    description: "Explore the transition from Proof of Work to Proof of Stake and its global impact.",
    stage: "initial",
    type: "text",
    reward: 10,
    imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    id: "q4",
    title: "Intro to Solana",
    description: "Understand how Solana achieves high scalability without sacrificing security.",
    stage: "initial",
    type: "mixed",
    reward: 10,
    contentUrl: "https://www.youtube.com/embed/68QWzuFmHnY",
    questions: [
      {
        q: "What consensus mechanism does Solana use?",
        options: ["Proof of Work", "Proof of Stake", "Proof of History", "Delegated Byzantine Fault Tolerance"],
        answer: 2,
      },
      {
        q: "What makes Solana special?",
        options: ["Low fees and high speed", "Centralized governance", "It’s only for NFTs", "Private blockchain"],
        answer: 0,
      },
    ],
  },
  {
    id: "q5",
    title: "Understanding Wallets",
    description: "Learn the difference between custodial and non-custodial wallets.",
    stage: "initial",
    type: "video",
    reward: 10,
    contentUrl: "https://www.youtube.com/embed/hYip_Vuv8J0",
  },
  {
    id: "q6",
    title: "Wallet Security Essentials",
    description: "Protect your crypto assets and stay safe in the decentralized world.",
    stage: "initial",
    type: "quiz",
    reward: 10,
    questions: [
      {
        q: "What should you never share with anyone?",
        options: ["Your public address", "Your private key", "Your wallet name", "Your email"],
        answer: 1,
      },
      {
        q: "What’s the safest way to store large amounts of crypto?",
        options: ["Hot wallet", "Exchange account", "Hardware wallet", "Paper notes"],
        answer: 2,
      },
    ],
  },
  {
    id: "q7",
    title: "Your First Solana Wallet",
    description: "Create and connect your first Solana wallet (like Phantom) to Solates.",
    stage: "initial",
    type: "text",
    reward: 10,
  },
  {
    id: "q8",
    title: "Fund Your Wallet & Gas Fees on Solana",
    description: "Learn how to fund your wallet and understand Solana’s low transaction fees.",
    stage: "initial",
    type: "video",
    reward: 10,
    contentUrl: "https://www.youtube.com/embed/CN7m0Zb4a1Y",
  },
  {
    id: "q9",
    title: "Investment Analysis Basics",
    description: "Identify trustworthy projects and avoid scams in the crypto space.",
    stage: "initial",
    type: "text",
    reward: 10,
  },
  {
    id: "q10",
    title: "Intro to DeFi",
    description: "Dive into decentralized finance and understand its opportunities.",
    stage: "initial",
    type: "quiz",
    reward: 10,
    questions: [
      {
        q: "What does DeFi stand for?",
        options: ["Defined Finance", "Decentralized Finance", "Deferred Finance", "Defensive Finance"],
        answer: 1,
      },
    ],
  },
  {
    id: "q11",
    title: "Intro to $OLA",
    description: "Discover the Solates token: purpose, utility, and long-term vision.",
    stage: "initial",
    type: "mixed",
    reward: 10,
    contentUrl: "https://www.youtube.com/embed/WhBz0R5nMFs",
  },
  {
    id: "q12",
    title: "Claim Your First Reward",
    description: "Congratulations! You’ve completed the beginner stage. Claim your reward.",
    stage: "initial",
    type: "text",
    reward: 10,
  },

  // 🟡 INTERMEDIATE STAGE (20 XP each)
  {
    id: "q13",
    title: "Swap Simulation",
    description: "Simulate a crypto swap and learn how decentralized exchanges work.",
    stage: "intermediate",
    type: "video",
    reward: 20,
    contentUrl: "https://www.youtube.com/embed/KYzlpRvWZ6c",
  },
  {
    id: "q14",
    title: "Trading with Crypto",
    description: "Learn the basics of spot and futures trading in crypto markets.",
    stage: "intermediate",
    type: "text",
    reward: 20,
  },
  {
    id: "q15",
    title: "Staking Fundamentals",
    description: "Discover how staking works and why it’s key for network security.",
    stage: "intermediate",
    type: "video",
    reward: 20,
  },
  {
    id: "q16",
    title: "Provide Liquidity",
    description: "Participate in liquidity pools and understand impermanent loss.",
    stage: "intermediate",
    type: "text",
    reward: 20,
  },
  {
    id: "q17",
    title: "Lending & Borrowing",
    description: "Learn how DeFi platforms allow lending assets and borrowing with collateral.",
    stage: "intermediate",
    type: "text",
    reward: 20,
  },
  {
    id: "q18",
    title: "Mining $OLA",
    description: "Unlock the $OLA mining feature by completing all previous quests.",
    stage: "intermediate",
    type: "video",
    reward: 20,
    contentUrl: "https://www.youtube.com/embed/VK0M3pqFZFc",
  },

  // 🔵 ADVANCED STAGE (50 XP each)
  {
    id: "q19",
    title: "Understanding Impermanent Loss",
    description: "Learn what impermanent loss is and how to manage it effectively.",
    stage: "advanced",
    type: "quiz",
    reward: 50,
  },
  {
    id: "q20",
    title: "DeFi Strategies",
    description: "Explore yield farming, compounding, and portfolio strategies.",
    stage: "advanced",
    type: "text",
    reward: 50,
  },
  {
    id: "q21",
    title: "Liquid Staking",
    description: "Understand how liquid staking increases capital efficiency.",
    stage: "advanced",
    type: "text",
    reward: 50,
  },
  {
    id: "q22",
    title: "Vaults",
    description: "Discover automated strategies and yield optimizations via vaults.",
    stage: "advanced",
    type: "text",
    reward: 50,
  },
  {
    id: "q23",
    title: "Governance & DAOs",
    description: "Participate in a simulated DAO voting session to learn governance.",
    stage: "advanced",
    type: "text",
    reward: 50,
  },
  {
    id: "q24",
    title: "Portfolio Management in Solates",
    description: "Use Solates tools to track and optimize your DeFi positions.",
    stage: "advanced",
    type: "text",
    reward: 50,
  },
  {
    id: "q25",
    title: "Earning with $OLA",
    description: "Learn strategies to maximize rewards and returns using $OLA.",
    stage: "advanced",
    type: "text",
    reward: 50,
  },
];
