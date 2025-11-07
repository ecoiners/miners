import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Routes, Route , Navigate} from "react-router-dom";

import Home from "./pages/home";
import Login from './pages/login';
import Register from './pages/register';
import EmailVerification from "./pages/email-verify";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import Dashboard from "./pages/dashboard";

import { useAuthStore } from "./store/auth-store";

const protectRoute = ({children}) => {
	const {isAuthenticated, user} = useAuthStore();
	
	if (!isAuthenticated) { return <Navigate to="/login" replace /> }
	
	if (!user.isVerified) { return <Navigate to="/verify-email" replace /> }
	
  return children;
}


function App() {
	
	
	return (
		<>
			<Routes>
			  <Route path="/" element={<Home />} />
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={
				
					  <Register />
				} />
				
				<Route path="/verify-email" element={<EmailVerification />} />
				<Route path="/forgot-password" element={<ForgotPassword/>} />
				<Route path="/reset-password" element={<ResetPassword/>}/>
				
				<Route path="/dashboard" element={
					<protectRoute>
					  <Dashboard/>
					</protectRoute>
				}/>
			</Routes>
			
			<Toaster />
		</>
	)
};

export default App;
