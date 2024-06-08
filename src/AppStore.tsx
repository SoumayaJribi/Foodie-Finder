import { create } from "zustand";
import { persist } from "zustand/middleware";

// Définition du type pour l'état
interface AppState {
  dopen: boolean;
  rows: any[];
  setRows: (rows: any[]) => void;
  updateOpen: (dopen: boolean) => void;
}

// Définition du store avec les types appropriés
const appStore = (set: (partial: Partial<AppState>) => void): AppState => ({
  dopen: true,
  rows: [],
  setRows: (rows) => set({ rows }),
  updateOpen: (dopen) => set({ dopen }),
});

// Ajout de la persistance
const useAppStore = create(persist(appStore, { name: "my_app_store" }));

export { useAppStore };
