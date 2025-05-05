export type LetterStatus = "correct" | "present" | "absent"| "none";

export interface LetterCheck {
  letter: string;
  status: LetterStatus;
}