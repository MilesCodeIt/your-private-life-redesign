import type { Component } from "solid-js";
import type { ApiError } from "@/api/types";

import type {
  AuthCheckUsernameRequestBody,
  AuthCheckUsernameResponseBody
} from "@/api/controllers/auth/check_username";

import type {
  SignUpRequestBody,
  SignUpResponseBody
} from "@/api/controllers/auth/signup";

import type {
  SignInRequestBody,
  SignInResponseBody
} from "@/api/controllers/auth/signin";

import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import fetchApi from "@/utils/fetchApi";

// Stores
// import { useUserStore } from "@/stores/user";

const AuthenticationPage: Component = () => {
  const [state, setState] = createStore<{
    // Globaux API.
    username: string;
    password: string;

    // Spécifiques à l'inscription.
    signup_email: string;
    captcha: string;

    // Globaux internes.
    step:
      | "specify_username"
      | "sign_up"
      | "sign_in";
    error: string | null;
  }>({
    username: "",
    password: "",

    signup_email: "",
    captcha: "",

    step: "specify_username",
    error: null
  });

  /**
   * Fonction short-hand permettant de mettre à jour
   * le message d'erreur en fonction de la réponse de l'API.
   */
  const catchApiErrors = (response: ApiError) => {
    setState({ error: response.message });
  };

  // const userSetInformations = useUserStore(state => state.setInformations);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    // Réinitialisation des états.
    setState({ error: null });

    switch (state.step) {
      case "specify_username": { 
        const response = await fetchApi<
          AuthCheckUsernameRequestBody,
          AuthCheckUsernameResponseBody
        >("/api/auth/check_username", {
          method: "POST",
          data: {
            username: state.username
          }
        });

        if (!response.success) return catchApiErrors(response);
        
        /** Si l'utilisateur existe, on passe à la connexion. */
        if (response.data.exists)
          setState({ step: "sign_in" });

        /** Sinon on passe à l'inscription. */
        else
          setState({ step: "sign_up" });
        
        break;
      }

      case "sign_up": {
        const response = await fetchApi<
          SignUpRequestBody,
          SignUpResponseBody
        >("/api/auth/signup", {
          method: "POST",
          data: {
            username: state.username,
            password: state.password,
            email: state.signup_email,
            captcha: state.captcha
          }
        });

        if (!response.success) return catchApiErrors(response);
        
        /**
         * Le compte vient d'être crée, donc
         * on demande à l'utilisateur de s'y connecter.
         * 
         * TODO: connexion automatique après l'inscription.
         */
        setState({ step: "sign_in" });
        
        break;
      }

      case "sign_in": {
        const response = await fetchApi<
          SignInRequestBody,
          SignInResponseBody
        >("/api/auth/signin", {
          method: "POST",
          data: {
            username: state.username,
            password: state.password
          }
        });

        if (!response.success) return catchApiErrors(response);

        // TODO: redirection à la page d'accueil.

        break;
      }
      
      // Lorsque l'étape est erronée, on revient au début.
      default:
        setState({ step: "specify_username" });
    }
  }

  const Input: Component<{
    type: "text" | "password" | "email";
    label: string;
    value: string;
    onChange: (e: Event & { currentTarget: HTMLInputElement }) => void; 
  }> = (props) => (
    <div class="w-full">
      <label>
        {props.label}
        <input
          class="
            w-full px-6 py-2
            outline-none border-none
            bg-nosferatu-100 text-nosferatu bg-opacity-60
            rounded-lg
          "

          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  )

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

        <Show
          when={state.step === "specify_username"}
          fallback={
            <div>
              <p>Connexion en tant que {state.username}</p>
              <button
                onClick={() => setState({ step: "specify_username" })}
              >
                Utiliser un autre compte ?
              </button>
            </div>
          }
        >
          <Input
            type="text"
            label="Nom d'utilisateur"
            value={state.username}
            onChange={e => setState({ username: e.currentTarget.value })}
          />
        </Show>

        <Show when={state.step === "sign_in" || state.step === "sign_up"}>
          <Input
            type="password"
            label="Mot de passe"
            value={state.password}
            onChange={e => setState({ password: e.currentTarget.value })}
          />
        </Show>

        <Show when={state.step === "sign_up"}>
          <Input
            type="email"
            label="Adresse E-Mail"
            value={state.signup_email}
            onChange={e => setState({ signup_email: e.currentTarget.value })}
          />

          {/* TODO: ajout de hcaptcha ici */}
        </Show>

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