import { useState, useEffect, useRef } from "react";
import { ComboLevel, COMBO_CONFIG } from "../types";

type ComboSystemProps = {
  onBonusCoinsEarned: (amount: number) => void;
  onComboLevelChange?: (level: ComboLevel) => void;
  onComboBroken?: () => void;
};

export const useComboSystem = ({
  onBonusCoinsEarned,
  onComboLevelChange,
  onComboBroken,
}: ComboSystemProps) => {
  // État du système de combo
  const [comboLevel, setComboLevel] = useState<ComboLevel>(ComboLevel.NONE);
  const [isComboActive, setIsComboActive] = useState(false);
  const [clicksCounter, setClicksCounter] = useState(0);

  // Références pour gérer les timers
  const comboStartTimeRef = useRef<number | null>(null);
  const lastClickTimeRef = useRef<number | null>(null);
  const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bonusIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration actuelle basée sur le niveau de combo
  const currentConfig = COMBO_CONFIG[comboLevel];

  // Fonction pour gérer les clics et mettre à jour le combo
  const handleClick = () => {
    const now = Date.now();

    // Premier clic ou combo cassé précédemment
    if (!isComboActive) {
      setIsComboActive(true);
      comboStartTimeRef.current = now;
      lastClickTimeRef.current = now;
      startComboTimeout();

      // Démarrer au niveau 0
      if (comboLevel === ComboLevel.NONE) {
        updateComboLevel(ComboLevel.NONE);
      }
    }
    // Combo en cours
    else {
      lastClickTimeRef.current = now;
      resetComboTimeout();

      // Vérifier si on peut passer au niveau supérieur
      if (comboStartTimeRef.current) {
        const comboDuration = now - comboStartTimeRef.current;

        if (
          comboDuration >= COMBO_CONFIG[ComboLevel.LEVEL_3].requiredTime &&
          comboLevel < ComboLevel.LEVEL_3
        ) {
          updateComboLevel(ComboLevel.LEVEL_3);
        } else if (
          comboDuration >= COMBO_CONFIG[ComboLevel.LEVEL_2].requiredTime &&
          comboLevel < ComboLevel.LEVEL_2
        ) {
          updateComboLevel(ComboLevel.LEVEL_2);
        } else if (
          comboDuration >= COMBO_CONFIG[ComboLevel.LEVEL_1].requiredTime &&
          comboLevel < ComboLevel.LEVEL_1
        ) {
          updateComboLevel(ComboLevel.LEVEL_1);
        }
      }
    }

    // Incrémenter le compteur de clics et vérifier les pièces gagnées
    const newClicksCounter = clicksCounter + 1;
    setClicksCounter(newClicksCounter);

    // Vérifier si on gagne une pièce (1 pièce tous les 10 clics)
    if (newClicksCounter % 10 === 0) {
      onBonusCoinsEarned(1);
    }
  };

  // Mettre à jour le niveau de combo et ses effets
  const updateComboLevel = (newLevel: ComboLevel) => {
    if (newLevel === comboLevel) return;

    // Nettoyer les intervalles existants
    if (bonusIntervalRef.current) {
      clearInterval(bonusIntervalRef.current);
      bonusIntervalRef.current = null;
    }

    // Mettre à jour le niveau
    setComboLevel(newLevel);

    // Notifier du changement de niveau
    if (onComboLevelChange) {
      onComboLevelChange(newLevel);
    }

    // Configurer le nouvel intervalle de bonus si nécessaire
    const config = COMBO_CONFIG[newLevel];
    if (config.bonusInterval > 0 && config.bonusCoins > 0) {
      bonusIntervalRef.current = setInterval(() => {
        onBonusCoinsEarned(config.bonusCoins);
      }, config.bonusInterval);
    }
  };

  // Démarrer le délai d'expiration du combo
  const startComboTimeout = () => {
    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current);
    }

    // Le combo expire après 2 secondes sans clic
    comboTimeoutRef.current = setTimeout(() => {
      breakCombo();
    }, 2000);
  };

  // Réinitialiser le délai d'expiration du combo
  const resetComboTimeout = () => {
    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current);
    }

    // Le combo expire après 2 secondes sans clic
    comboTimeoutRef.current = setTimeout(() => {
      breakCombo();
    }, 2000);
  };

  // Casser le combo
  const breakCombo = () => {
    setIsComboActive(false);
    setComboLevel(ComboLevel.NONE);
    comboStartTimeRef.current = null;
    lastClickTimeRef.current = null;

    // Nettoyer les intervalles
    if (bonusIntervalRef.current) {
      clearInterval(bonusIntervalRef.current);
      bonusIntervalRef.current = null;
    }

    // Notifier que le combo est cassé
    if (onComboBroken) {
      onComboBroken();
    }
  };

  // Nettoyer les timeouts et intervals lors du démontage
  useEffect(() => {
    return () => {
      if (comboTimeoutRef.current) {
        clearTimeout(comboTimeoutRef.current);
      }
      if (bonusIntervalRef.current) {
        clearInterval(bonusIntervalRef.current);
      }
    };
  }, []);

  return {
    comboLevel,
    isComboActive,
    clicksCounter,
    handleClick,
    currentConfig,
  };
};
