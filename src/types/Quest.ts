export interface Question {
  q: string;
  options: string[];
  answer: number;
}

export interface Quest {
  id?: string; // opcional → Firebase lo genera automáticamente
  title: string;
  description: string;
  stage: "initial" | "intermediate" | "advanced" | "bonus";
  type: "text" | "video" | "quiz" | "mixed";
  reward: number;
  contentUrl?: string;
  imageUrl?: string;
  questions?: Question[];
}
