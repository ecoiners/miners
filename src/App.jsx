
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from './pages/login';
import Register from './pages/register';
import EmailVerification from "./pages/email-verify";
import ForgotPassword from "./pages/forgot-password";

import Header from "./components/header"
function App() {
	
	return (
		<>
			<Header/>
			<Routes>
			  <Route path="/" element={<Home />} />
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register />} />
				<Route path="/email-verify" element={<EmailVerification />} />
				<Route path="/forgot-password" element={<ForgotPassword/>} />
			</Routes>
		</>
	)
};

export default App;
