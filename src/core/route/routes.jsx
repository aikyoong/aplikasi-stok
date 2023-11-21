import { Router, Route, RootRoute } from "@tanstack/react-router";

import Root from "./RootRouterWrapper";
import Login from "@/pages/auth/Login";
import Landing from "@/pages/landingpage/app";
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
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

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
  path: "/konsumen",
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

// Create the router using your route tree
export const router = new Router({
  routeTree: rootRoute.addChildren([
    indexRoute,
    loginPage,
    timRoute,
    productRoute,
    customerRoute,
    salesRoute,
    vendorRoute,
  ]),
});
