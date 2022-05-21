import type { ApiSuccess, ApiError } from "@/api/types";

import ky, { HTTPError } from "ky";

/**
 * Fonction pour envoyer une requête à l'API
 * locale située dans `@/api`.
 * 
 * L'argument `B` correspond au typing du body de
 * la requête. Cela permet d'ajouter de l'IntelliSense.
 * 
 * L'argument `R` correspond au typing de la réponse
 * que donnera l'API si la requête réussie.
 */
const fetchApi = async <B, R>(
  /** URI de la ressource API à appeler. */
  path: string,

  /** Options à passer dans la requête. */
  options: {
    /** Méthode HTTP ; `GET` par défaut. */
    method: string;
    /** Données JSON à envoyer à l'API. */
    data?: B;
  }

  // Valeurs par défaut: `GET {path} ; JSON: {}`.
  = {
    method: "GET"
  }
): Promise<ApiSuccess<R> | ApiError> => {
  try {
    const response = await ky(path, {
      method: options.method,
      json: options.data
    }).json<ApiSuccess<R> | ApiError>();

    return response;
  }
  catch (error) {
    if (error instanceof HTTPError) {
      const response = await error.response.json() as ApiError;
      return response;
    }

    return {
      success: false,
      message: "Une erreur inconnue est surevenue côté client, veuillez réessayer."
    };
  }
}

export default fetchApi;