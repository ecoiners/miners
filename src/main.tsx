import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import route from "./routes";
import WebApp from "@twa-dev/sdk";

WebApp.setHeaderColor("#000000");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	  <div className="min-h-screen font-roboto" data-theme="black">
      <RouterProvider router={route} />
		</div>	
  </StrictMode>
);