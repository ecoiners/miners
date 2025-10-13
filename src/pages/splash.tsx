import WebApp from "@twa-dev/sdk";
import { useLoginUserMutation } from "../api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import splashimage from "../assets/images/splash.png";

export default function Splash() {
  const [loginUser, { data, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // Simulasi progress bar (biar ada animasi)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          return 100;
        }
        return old + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto login user Telegram
  useEffect(() => {
    loginUser({ key: WebApp.initData });
  }, [loginUser]);

  useEffect(() => {
    if (data?.success) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/app", { replace: true });
    }
  }, [data, navigate]);

  if (error) console.error("Login error:", error);

  return (
    <div
      className="flex flex-col items-center justify-end h-screen w-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${splashimage})`,
        backgroundColor: WebApp.themeParams?.bg_color || "#0a0a0a",
      }}
    >
      {/* Overlay gradasi */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Loading text */}
      <div className="absolute top-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-2xl font-semibold tracking-wide">Loading...</h1>
        <p className="text-sm text-gray-300 mt-2">Please wait, connecting...</p>
      </div>

      {/* Loading bar */}
      <div className="w-4/5 mb-16 h-3 bg-gray-700 rounded-full overflow-hidden z-10">
        <div
          className="h-full bg-green-400 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

/* v 2

import WebApp from "@twa-dev/sdk";
import { useLoginUserMutation } from "../api/user"; // IMPORT HOOK LANGSUNG
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashimage from "../assets/images/splash.png"

export default function Splash() {
    // hooks
    const [loginUser, { data, isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    
    useEffect(() => {
        loginUser({
            key: WebApp.initData
        });
				
    }, [loginUser]);
    
    useEffect(() => {
        if (data?.success) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            navigate("/app", { replace: true });
        }
    }, [data, navigate]);
    
    if (error) {
        console.error("Login error:", error);
    }
    
    return (
        <div style={{ background: `${WebApp.themeParams.bg_color}` }}>
            splash bg mobile telegram mini app+loading bar
        </div>
    );
};
*///

/* versi 1
import WebApp from "@twa-dev/sdk";
import splash from "../assets/splash.png";
import User from "../api/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
	const [trigger, {data}] = User.LoginUser();
	const navigate = useNavigate();
	
	useEffect(() => {
		trigger({
			key: WebApp.initData
		});
		
	}, [trigger]);
	
	useEffect(() => {
		if (data?.token) {
			sessionStorage.setItem("token", dats?.token);
			navigate("/app", {replace:true});
	}, [data?.token, navigate]);
	
	return (
		<div style={{background: `${WebApp.themeParams.bg_color}`}} className="">
		  splash keren
		</div>
	);
};

*/
