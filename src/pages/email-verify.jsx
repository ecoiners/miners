import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function EmailVerification() {
	const [code, setCode] = useState([
		"", "", "", "", "", ""
	]);
	const inputRef = useRef([]);
	const navigate = useNavigate();
	
	return (
		<div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden ">
		 <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl"
     >
			<h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
        Verifikasi Email
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Masukkan kode verifikasi 6 digit yang telah kami kirim ke email kamu
      </p>
			
			<form className="space-y-6" >
			  <div className="flex justify-between">
				  {code.map((digit, index) => (
						<input 
						  key={index}
						/>
					))}
				</div>
			</form>
		 </motion.div>
		</div>
	);
};

export default EmailVerification;