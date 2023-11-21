import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAutoLogout } from "@/store/useAuth";

function Root() {
  // useAutoLogout();
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default Root;
