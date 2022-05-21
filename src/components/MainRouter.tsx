import type { Component } from "solid-js";

import {
  Router as SolidRouter,
  Routes,
  Route
} from "solid-app-router";

import Error404           from "@/pages/404";
import DesktopPage        from "@/pages/desktop";
import AuthenticationPage from "@/pages/authentication";


const MainRouter: Component = () => (
  <SolidRouter>
    <Routes>

      <Route path="/authentication" element={<AuthenticationPage />} />
      <Route path="/" element={<DesktopPage />} />

      <Route path="*" element={<Error404 />} />

    </Routes>
  </SolidRouter>
);

export default MainRouter;