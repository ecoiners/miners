import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "./layout/layout-app";
import NotFound from "./pages/notfound";
import Splash from "./pages/splash";

const Routes = createBrowserRouter([
	{
		path: "/app",
		element: <LayoutApp />
	},
	{
		path: "/",
		element: <Splash />,
		errorElement: <NotFound />
	}
]);

export default Routes;
