import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/connection/database";
import { TeamStats } from "../types";

export const useTeamScores = () => {
  const [teamStats, setTeamStats] = useState<TeamStats>({ red: 0, blue: 0 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const redScore = doc(db, "scores", "red");
    const blueScore = doc(db, "scores", "blue");

    // Écouter les changements pour l'équipe rouge
    const unsubscribeRed = onSnapshot(redScore, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const redData = docSnapshot.data();
        setTeamStats((prev) => ({ ...prev, red: redData.score || 0 }));
      }
    });

    // Écouter les changements pour l'équipe bleue
    const unsubscribeBlue = onSnapshot(blueScore, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const blueData = docSnapshot.data();
        setTeamStats((prev) => ({ ...prev, blue: blueData.score || 0 }));
      }
    });

    // Nettoyage des abonnements lors du démontage du composant
    return () => {
      unsubscribeRed();
      unsubscribeBlue();
    };
  }, []);

  // Mettre à jour le compteur total chaque fois que les stats des équipes changent
  useEffect(() => {
    setCount(teamStats.red + teamStats.blue);
  }, [teamStats]);

  return { teamStats, count };
};
