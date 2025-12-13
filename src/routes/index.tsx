import { createRoute, createRouter } from "@tanstack/react-router";
import { login } from "./login";
import { workbench } from "./workbench";
import { rootRoute } from "./root";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    return <div className="">root</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, login, workbench]);

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
