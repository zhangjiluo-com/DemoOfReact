import { createRoute } from "@tanstack/react-router";
import { lazyLoad, rootRoute } from "./root";

export const login = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: lazyLoad(() => import("../pages/Login")),
});
