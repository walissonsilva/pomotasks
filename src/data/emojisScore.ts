export interface IEmojiScore {
  emoji: string;
  description: string;
}

export const emojisScore: IEmojiScore[] = [
  { emoji: "🤓", description: "Focused" },
  { emoji: "😬", description: "Neutral" },
  { emoji: "🤤", description: "Distracted" },
];
