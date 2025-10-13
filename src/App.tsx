import User from "./api/user";

export default function App() {
	const [trigger, { data }] = User.LoginUser();
	
	return (
		
	);
};