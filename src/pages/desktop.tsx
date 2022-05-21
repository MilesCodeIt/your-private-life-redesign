import type { Component } from "solid-js";

import { Link } from "solid-app-router";
import { withProtectedPage } from "@/components/ProtectedPage";

const DesktopPage: Component = () => {
  return (
    <div>
      <h1>Accueil</h1>

      <Link class="text-nosferatu" href="/authentication">Connexion</Link>
    </div>
  )
};

export default withProtectedPage(DesktopPage);
