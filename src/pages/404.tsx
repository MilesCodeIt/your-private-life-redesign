import type { Component } from "solid-js";
import { Link } from "solid-app-router";

const Error404: Component = () => {
  return (
    <div>
      <h1>Erreur 404 !</h1>

      <Link class="text-nosferatu" href="/">Revenir à la page d'accueil</Link>
    </div>
  )
};

export default Error404;