import create from "solid-zustand";

interface UserInformations {
  is_authenticated: true;
  username: string;
}

interface UserStore {
  informations: UserInformations | { is_authenticated: false };
  setInformations: (informations: UserInformations) => void;
  
  /** Niveaux que l'utilisateur a complété, ou non. */
  levels: {
    [id: string]: boolean;
  }
}

export const useUserStore = create<UserStore>(set => ({
  informations: { is_authenticated: false },

  setInformations: (informations) => {
    set(() => ({ informations }));
  },

  levels: {}
}));

