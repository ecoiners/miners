import { Routes, Route } from "react-router";

import Navbar from "./components/navbar";
import Home from "./pages/home";

export default function App() {
	
	return (
		<div className="min-h-screen text-white transition-opacity duration-700 pt-20">
		  <Navbar />
			
		  <div className="container px-4 py-6 mx-auto">
			  <Routes>
				  <Route path="/" element={<Home />} />
				</Routes>
			</div>
		</div>
	);
};