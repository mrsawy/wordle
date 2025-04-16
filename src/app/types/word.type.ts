export type LetterStatus = "correct" | "present" | "absent";

export interface LetterCheck {
  letter: string;
  status: LetterStatus;
}