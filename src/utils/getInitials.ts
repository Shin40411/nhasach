import { removeVietnameseTones } from "./removeVnTones";

export function getInitials(phrase: string) {
    return phrase
      .toLowerCase()
      .split(/\s+/)
      .map(word => removeVietnameseTones(word[0]))
      .join('');
  }