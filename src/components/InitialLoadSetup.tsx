import type { Component } from "solid-js";
import { onMount, createSignal } from "solid-js";

import fetchApi from "@/utils/fetchApi";

/**
 * Ce composant affiche le chargement "Your Private Life"
 * lors du chargement initial de l'application.
*/
const StartLoader: Component = () => {
  // Message affiché lors du chargement.
  const [loadingMessage, setLoadingMessage] = createSignal("Chargement...");
  
  const fetchUserInformations = async () => {
    setLoadingMessage("Vérification authentification...");
    
    console.info("fetchUserInformations: /api/users/me");
    const userdata_response = await fetchApi("/api/users/me");
    
    console.log(userdata_response);

  }; onMount(fetchUserInformations);
  
  
  return (
    <p>
      {loadingMessage()}
    </p>
  );
};

export default StartLoader;