// import SideNav from "@/components/Nav/SideNav";

// import SideNav from "@/components/sidenav/SideNav";
import SideNavHorz from "@/components/sidenav/SideNavHorz";
import useAuth from "@/store/useAuth";
import TableContainer from "@/components/Table/y-shadcn-table";
import { router } from "@/core/route/routes";
// import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import { Outlet, redirect, useNavigate } from "@tanstack/react-router";

function ClientArea() {
  return (
    <Layout>
      <div className="min-h-screen">
        <SideNavHorz />
        <section>
          <Outlet />
        </section>
      </div>
    </Layout>
  );
}

export default ClientArea;
