import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/connection/database";

export const useTeamActions = (team: string) => {
  const handleIncrementScore = async () => {
    const teamRef = doc(db, "scores", team); // Ex: "scores/red"
    await updateDoc(teamRef, {
      score: increment(1),
    });
  };

  return { handleIncrementScore };
};
