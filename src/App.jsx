import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Dayli from "./pages/Dayli";
import Earn from "./pages/Earn";
import Airdrop from "./pages/Airdrop";
import Refferals from "./pages/Refferals";
import ButtonNavbar from "./components/ButtonNavbar";

function App() {
  
  return (
    <Router>
		  <ButtonNavbar />
		  <Routes>
			  <Route path="/" element={<Home />} />
				<Route path="/dayli" element={<Dayli />} />
				<Route path="/earn" element={<Earn />} />
				<Route path="/airdrop" element={<Airdrop />} />
				<Route path="/refferals" element={<Refferals />} />
			</Route>
		</Router>
  );
};

export default App;
