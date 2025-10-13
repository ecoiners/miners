import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import store from "./store.tsx"
import { Provider } from "react-redux";
import WebApp from "@twa-dev/sdk";
import Routes from "./routes.tsx";
import { RouterProvider } from "react-router-dom";

const isTelegram = WebApp.platform;
const themes = isTelegram === "unknown" ? "" : "dark";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	  <div data-theme={themes} className="min-h-screen">
			<Provider store={store}>
        <RouterProvider router={Routes} />
		  </Provider>
		</div>
  </StrictMode>,
)
