/* @refresh reload */
import "./styles/tailwind.css";

import { Component, Show } from "solid-js";
import { render } from "solid-js/web";

import InitialLoadSetup from "@/components/InitialLoadSetup";
import MainRouter from "@/components/MainRouter";
import appStore from "@/stores/app";

/**
 * Ce composant permet d'établir les états
 * par défauts de l'application et aussi
 * d'introduire le routeur.
 */
const Main: Component = () => {
  const { app } = appStore;

  return (
    <Show
      when={app.initialLoadFinished}
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
