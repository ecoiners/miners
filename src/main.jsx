import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { client } from "./client";

import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { holesky } from "thirdweb/chains"; // ✅ IMPORT CHAIN OBJECT

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThirdwebProvider client={client} activeChain={holesky}>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <App />
        </div>
      </Router>
    </ThirdwebProvider>
  </StrictMode>
);