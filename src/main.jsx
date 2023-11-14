import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import QueryRouterApp from "./core/route/QueryRouterApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { QueryClient, QueryClientProvider } from "react-query";
// Render our app!
const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

if (rootElement) {
  // Periksa apakah rootElement ada sebelum mengaksesnya
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <QueryRouterApp />
        </StrictMode>
      </QueryClientProvider>
    );
  }
}
