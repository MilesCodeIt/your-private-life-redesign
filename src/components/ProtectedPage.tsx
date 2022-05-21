import type { Component } from "solid-js";
import { Show } from "solid-js";

import { useUserStore } from "@/stores/user";
import { Navigate } from "solid-app-router";

/**
 * Ce component permet de vérifier si l'utilisateur
 * est connecté avant qu'il accède au contenu de la page.
 */
const ProtectedPage: Component = ({ children }) => {
  const user = useUserStore(state => state.informations);

  return (
    <Show
      when={user.is_authenticated}
      fallback={<Navigate href="/authentication" />}
    >
      {children}
    </Show>
  )
}

export default ProtectedPage;
export const withProtectedPage = (PageComponent: Component) => () => (
  <ProtectedPage>
    <PageComponent />
  </ProtectedPage>
);
