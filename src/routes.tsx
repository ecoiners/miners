import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import AppLayout from "./components/layout/AppLayout";
import Splash from "./pages/app/Splash";
import Spin from "./pages/app/Spin";
import Task from "./pages/app/Task";
import Invite from "./pages/app/Invite";
import Wallet from "./pages/app/Wallet";
import ProtectUser from "./utils/ProtectUser";

const route = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/app",
		element: <ProtectUser><AppLayout /></ProtectUser>,
		children: [
			{
				path: "spin",
				element: <Spin />,
			},
			{
				path: "task",
				element: <Task />,
			},
			{
				path: "invite",
				element: <Invite />,
			},
			{
				path: "wallet",
				element: <Wallet />,
			}
		],
	},
	{
		path: "splash",
		element: <Splash />,
	}
]);

export default route;