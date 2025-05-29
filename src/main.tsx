// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./UserInfoContext/UserInfoContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
  // {/* </StrictMode> */}
);
