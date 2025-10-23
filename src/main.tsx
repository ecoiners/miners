import React from "react";
import { createRoot } from "react-dom/client";
import App  from "./App";
import { ThirdwebProvider } from "thirdweb/react";
//import { holesky } from "thirdweb/chains";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

//import { client } from "./client";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider >
      <Router>
        <div className="min-h-screen bg-black text-white">
          <App />
        </div>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
