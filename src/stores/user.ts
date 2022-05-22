import { createStore } from "solid-js/store";

interface UnauthenticatedUserStore {
  is_authenticated: false;  

  username: null;
  email: null;
  
  levels: null;
}

export interface AuthenticatedUserStore {
  is_authenticated: true;

  username: string;
  email: string;

  /** Niveaux que l'utilisateur a complété, ou non. */
  levels: Map<string, boolean>;
}

export const defaultUserStore: UnauthenticatedUserStore = {
  is_authenticated: false,
  
  username: null,
  email: null,
  
  levels: null
}

const [user, setUser] = createStore<
  | UnauthenticatedUserStore
  | AuthenticatedUserStore
>(defaultUserStore);

export default {
  user, setUser
};
