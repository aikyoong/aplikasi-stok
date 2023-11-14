import { Router, Route, RootRoute, redirect } from "@tanstack/react-router";
import useAuth from "@/store/useAuth";
import Root from "./RootRouterWrapper";
import Login from "@/pages/auth/Login";

import Landing from "@/pages/LandingPage/app";
import ClientArea from "@/pages/clientarea/ClientArea";
import PricingPage from "@/pages/LandingPage/pricing/Pricing";
import Order from "@/pages/LandingPage/order/Order";
import ThxOrder from "@/pages/LandingPage/order/ThxOrder";

import InvoiceDetail from "@/components/clientarea/InvoiceDetail";
import SubsApp from "@/components/clientarea/SubsApp";

import Team from "@/pages/apps/Team";
import Customer from "@/pages/apps/Customer";
import Produk from "@/pages/apps/Product";
import Sales from "@/pages/apps/Sales";
import Vendor from "@/pages/apps/Vendor";

// Root
const rootRoute = new RootRoute({
  component: Root,
});

// Index (App.tsx) route : Route
// const indexRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/",
//   component: Landing,
// });

// About (pricing-page.tsx) route
// const pricingPage = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/pricing",
//   component: PricingPage,
// });

// const orderPage = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/order",
//   component: Order,
// });

// const ThxPage = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/thanks-order",
//   component: ThxOrder,
// });

// const clientAreaRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/clientarea",
//   component: ClientArea,
// });

const loginPage = new Route({
  getParentRoute: () => rootRoute,
  path: "/masuk",
  component: Login,
});

const timRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/tim",
  component: Team,
});

const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/produk",
  component: Produk,
});

const customerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/pelanggan",
  component: Customer,
});
const salesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/penjualan",
  component: Sales,
});
const vendorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/vendor",
  component: Vendor,
});

const privateLayout = new Route({
  getParentRoute: () => rootRoute,
  id: "private",
  beforeLoad: async () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
      throw redirect({
        to: "/login",
      });
    }

    return {
      isLoggedIn,
    };
  },
});

// Create the router using your route tree
export const router = new Router({
  routeTree: rootRoute.addChildren([
    loginPage,
    timRoute,
    productRoute,
    customerRoute,
    salesRoute,
    vendorRoute,
    // privateLayout.addChildren([
    //   clientAreaRoute.addChildren([invoiceClient, SubsClient]),
    // ]),
  ]),
});
