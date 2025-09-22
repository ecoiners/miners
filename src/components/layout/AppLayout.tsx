import { Outlet } from "react-router-dom";
import ButtonNavbar from "../navigation/ButtonNavbar";

const AppLayout = () => {
	
	return (
		<div>
		  <Outlet />
			<ButtonNavbar />
		</div>
	);
};

export default AppLayout;