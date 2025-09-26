import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screen/home";
import Earn from "./screen/earn";
import Dayli from "./screen/dayli";
import Refferals from "./screen/refferals";
import Wallet from "./screen/wallet";
import BottomNav from "./components/bottom-navbar";

function App() {
  
  return (
    <Router>
		  <ButtonNav />
		  <Routes>
			  <Route path="/" element={<Home />} />
				<Route path="/earn" element={<Earn />} />
				<Route path="/dayli" element={<Dayli />} />
				<Route path="/invite" element={<Refferals />} />
				<Route path="/wallet" element={<Wallet />} />
				
				
			</Routes>
    </Router>
  )
}

export default App;
