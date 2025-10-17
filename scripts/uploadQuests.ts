// ⚡ Script para subir todas las quests a Firestore automáticamente

// IMPORTS —> con extensión .js para ESM
import { db } from "../src/firebase.js";
import { questsData } from "../src/data/questsData.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

async function uploadQuests() {
  try {
    for (const quest of questsData) {
      const questRef = doc(db, "quests", quest.id);

      // Subimos quest con timestamp de creación
      await setDoc(questRef, {
        ...quest,
        createdAt: serverTimestamp(),
      });

      console.log("✅ Quest uploaded:", quest.title);
    }

    console.log("\n🎉 Todas las quests fueron subidas correctamente!");
  } catch (err) {
    console.error("❌ Error subiendo quests:", err);
  }
}

// Ejecutar
uploadQuests();
