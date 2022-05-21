/* @refresh reload */
import "./styles/tailwind.css";

import { Component, Show, onMount, createSignal } from "solid-js";
import { render } from "solid-js/web";

import InitialLoadSetup from "@/components/InitialLoadSetup";
import MainRouter from "@/components/MainRouter";
import { useUserStore } from "@/stores/user";

/**
 * Ce composant permet d'établir les états
 * par défauts de l'application et aussi
 * d'introduire le routeur.
 */
const Main: Component = () => {
  const user = useUserStore(state => state.informations);

  return (
    <Show
      when={user.is_authenticated}
      fallback={<InitialLoadSetup />}
    >
      <MainRouter />
    </Show>
  )
};

render(
  () => <Main />,
  document.getElementById("root") as HTMLDivElement
);
