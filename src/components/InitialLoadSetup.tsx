import type { Component } from "solid-js";
import { onMount, createSignal } from "solid-js";

// Utilitaires
import fetchApi from "@/utils/fetchApi";

// Stores
import appStore from "@/stores/app";
import userStore from "@/stores/user";

/**
 * Ce composant affiche le chargement "Your Private Life"
 * lors du chargement initial de l'application.
*/
const StartLoader: Component = () => {
  const { setApp } = appStore;
  const { setUser } = userStore;

  // Message affiché lors du chargement.
  const [loadingMessage, setLoadingMessage] = createSignal("Chargement...");
  
  const fetchUserInformations = async () => {
    setLoadingMessage("Vérification authentification...");
    
    console.info("fetchUserInformations: -> /api/users/me");
    const userdata_response = await fetchApi("/api/users/me");
    console.info("fetchUserInformations: <-", userdata_response);
    
    // Mise à jour du message de chargement.
    setLoadingMessage(
      userdata_response.success
        ? "Vous êtes connecté !"
        : userdata_response.message
    );
    
    if (userdata_response.success) {
      setUser({
        is_authenticated: true,
        username: "Vexcited !",
        email: "",
        levels: new Map<string, boolean>()
      });
    }
    
    // On indique que le chargement initial est terminé.
    setApp({ initialLoadFinished: true });
  }; onMount(fetchUserInformations);
  
  
  return (
    <p>
      {loadingMessage()}
    </p>
  );
};

export default StartLoader;