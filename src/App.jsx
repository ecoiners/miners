
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import VerifyEmailPage from "./pages/email-verify";
import BuyPage from "./pages/buy";
import ResetPasswordPage from "./pages/reset-password";
import ForgotPasswordPage from "./pages/forgot-password";
import Header from "./components/header"

function App() {
	
	return (
		<>
		  <Header />
			<Routes>
			  <Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/email-verify" element={<VerifyEmailPage/>} />
				<Route path="/buy" element={<BuyPage/>} />
				
				<Route path="/forgot-password" element={<ForgotPasswordPage />}/>
				<Route path="/reset-password" element={<ResetPasswordPage />} />
			</Routes>
		</>
	)
};

export default App;