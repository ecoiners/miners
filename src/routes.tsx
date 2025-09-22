import { createBrowserRouter } from "react-router-dom";
import App from "./pages/app";
import AppLayout from "./components/layout/AppLayout";
import Splash from "./pages/app/Splash";

const route = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/app",
		element: <AppLayout />,
		children: [
			{
				path: "splash",
				element: <Splash />
			},
		],
	}
]);

export default route;