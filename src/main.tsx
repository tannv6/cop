import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MetaInfoProvider } from "./contexts/MetaInfoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
    <MetaInfoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </MetaInfoProvider>
    </HelmetProvider>
  </StrictMode>
);
