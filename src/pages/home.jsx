import { Link } from "react-router-dom";


function Home() {
	
	return (
		<div className="min-h-screen flex items-center justify center gap-4 bg-black">
		  <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
		  <Link to="/login" className="text-blue-500">login</Link>
			
		  <Link to="/register" className="text-blue-500">Register</Link>
			
			
		</div>
	)
};

export default Home;