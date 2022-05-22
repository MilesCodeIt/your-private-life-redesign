import type { ParentComponent, Component } from "solid-js";
import { Show, children as access_children } from "solid-js";

import userStore from "@/stores/user";
import { Navigate } from "solid-app-router";

/**
 * Ce component permet de vérifier si l'utilisateur
 * est connecté avant qu'il accède au contenu de la page.
 */
const ProtectedPage: ParentComponent = (props) => {
  const children = access_children(() => props.children);
  const { user } = userStore;

  return (
    <Show
      when={user.is_authenticated}
      fallback={<Navigate href="/authentication" />}
    >
      {children()}
    </Show>
  )
}

export default ProtectedPage;
export const withProtectedPage = (PageComponent: Component) => () => (
  <ProtectedPage>
    <PageComponent />
  </ProtectedPage>
);
