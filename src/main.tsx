import React from "react";
import { createRoot } from "react-dom/client";
import App  from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { holesky } from "thirdweb/chains";
import "./index.css";

//import { client } from "./client";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider  activeChain={holesky}>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <App />
        </div>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
