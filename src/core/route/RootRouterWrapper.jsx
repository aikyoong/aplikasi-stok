import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function Root() {
  return (
    <main>
      <Outlet />
      {/* <TanStackRouterDevtools position="top-right" /> */}
    </main>
  );
}

export default Root;
