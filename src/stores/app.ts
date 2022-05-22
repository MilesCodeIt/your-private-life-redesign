import { createStore } from "solid-js/store";

interface AppStore {
  initialLoadFinished: boolean;
}

const [app, setApp] = createStore<AppStore>({
  initialLoadFinished: false
});

export default {
  app, setApp
};
