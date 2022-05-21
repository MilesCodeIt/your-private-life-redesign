import type { Component } from "solid-js";

import ky, { HTTPError } from "ky";
import { createStore } from "solid-js/store";

// Stores
// import { useUserStore } from "@/stores/user";

const AuthenticationPage: Component = () => {
  const [state, setState] = createStore<{
    username: string;
    password: string;
    signup_email: string;
    step:
      | "specify_username"
      | "sign_up"
      | "sign_in";
  }>({
    username: "",
    password: "",
    signup_email: "",
    step: "specify_username"
  });

  // const userSetInformations = useUserStore(state => state.setInformations);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      if (state.step === "specify_username") {
        const data = await ky.post("/api/auth/check_username", {
          json: {
            username: state.username
          }
        }).json();
      }

      else if (state.step === "sign_in") {
        const data = await ky.post("/api/auth/signin", {
          json: {
            username: state.username,
            password: state.password
          }
        }).json();
      }

      else if (state.step === "sign_up") {
        const data = await ky.post("/api/auth/signup", {
          json: {
            username: state.username,
            password: state.password,
            email: state.signup_email
          }
        }).json();
      }
    }
    catch (e) {
      if (e instanceof HTTPError) {
        const response = await e.response.json();
        console.error("HTTPError:", response.error);

        return;
      }
    }

    // userSetInformations({
    //   is_authenticated: true,
    //   username: state.username
    // });
  }

  return (

    <div class="
      bg-nosferatu
      w-screen h-screen

      flex flex-col justify-center items-center gap-8
    ">

      <div class="h-64 w-64 bg-nosferatu-800"></div>

      <form onSubmit={handleSubmit}
        class="
          flex flex-col justify-center items-center gap-4
        "
      >

        <div>
          <label>
            Nom d'utilisateur
            <input
              class="
                w-full px-6 py-2
                outline-none border-none
                bg-nosferatu-100 text-nosferatu bg-opacity-60
                rounded-lg
              "

              type="text"
              value={state.username}
              onChange={e => setState({ username: e.currentTarget.value })}
            />
          </label>
        </div>

        <a class="text-">Mot de passe oublié</a>

        {/* <input
          type="password"
          placeholder="Mot de passe"
          value={state.password}
          onChange={e => setState({ password: e.currentTarget.value })}
        /> */}

        <button
          class="px-4 py-2 bg-nosferatu rounded-lg"
          type="submit"
        >
          Connexion
        </button>
      </form>

    </div>
  )
};

export default AuthenticationPage;