export function getRankInfo(xp: number) {
  if (xp >= 2000) return { rank: "Diamond Pioneer 💎", multiplier: 2.0 };
  if (xp >= 1500) return { rank: "Innovator", multiplier: 1.5 };
  if (xp >= 1000) return { rank: "DeFi Learner", multiplier: 1.25 };
  if (xp >= 500) return { rank: "Trader", multiplier: 1.1 };
  return { rank: "Explorer", multiplier: 1.0 };
}
