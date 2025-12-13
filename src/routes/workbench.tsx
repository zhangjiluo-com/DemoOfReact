import { createRoute } from "@tanstack/react-router";
import { lazyLoad } from "./root";
import { rootRoute } from "./root";

export const workbench = createRoute({
  getParentRoute: () => rootRoute,
  path: "workbench",
  // id: "workbench",
  component: lazyLoad(() => import("../pages/Workbench")),
});

const workbenchHome = createRoute({
  getParentRoute: () => workbench,
  path: "/",
  component: lazyLoad(() => import("../pages/Home")),
});

const workbenchList = createRoute({
  getParentRoute: () => workbench,
  path: "list",
  // path: "_b",
  component: lazyLoad(() => import("../pages/List")),
});

workbench.addChildren([workbenchHome, workbenchList]);
