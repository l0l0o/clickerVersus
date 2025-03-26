export type TeamStats = {
  red: number;
  blue: number;
};

export type UserData = {
  username: string;
  team: string;
  score: number;
  coins: number;
  autoClicker: AutoClickerData;
};

export type TeamColor = "red" | "blue";

export type AutoClickerData = {
  level: number;
  isBought: boolean;
};

// Niveau du bonus de combo
export enum ComboLevel {
  NONE = 0, // Pas de combo
  LEVEL_1 = 1, // 5 secondes - 1 pièce supplémentaire
  LEVEL_2 = 2, // 15 secondes - 3 pièces toutes les 3 secondes
  LEVEL_3 = 3, // 30 secondes - 1 pièce par seconde
}

// Configuration des niveaux de combo
export const COMBO_CONFIG = {
  [ComboLevel.NONE]: {
    requiredTime: 0,
    coinsPerClick: 0.1, // 1 pièce tous les 10 clics
    bonusCoins: 0,
    bonusInterval: 0,
    glowIntensity: 0,
  },
  [ComboLevel.LEVEL_1]: {
    requiredTime: 5000, // 5 secondes
    coinsPerClick: 0.1, // 1 pièce tous les 10 clics
    bonusCoins: 1, // 1 pièce bonus
    bonusInterval: 5000, // toutes les 5 secondes
    glowIntensity: 1,
  },
  [ComboLevel.LEVEL_2]: {
    requiredTime: 15000, // 15 secondes
    coinsPerClick: 0.1, // 1 pièce tous les 10 clics
    bonusCoins: 3, // 3 pièces bonus
    bonusInterval: 3000, // toutes les 3 secondes
    glowIntensity: 2,
  },
  [ComboLevel.LEVEL_3]: {
    requiredTime: 30000, // 30 secondes
    coinsPerClick: 0.1, // 1 pièce tous les 10 clics
    bonusCoins: 1, // 1 pièce bonus
    bonusInterval: 1000, // chaque seconde
    glowIntensity: 3,
  },
};
