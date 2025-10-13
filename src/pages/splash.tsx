import WebApp from "@twa-dev/sdk";
import { useLoginUserMutation } from "../api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import splashimage from "../assets/images/splash.png";

export default function Splash() {
  const [loginUser, { data, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  // Simulasi progress ±15 menit (900 detik)
  useEffect(() => {
    const totalDuration = 15 * 60 * 1000; // 15 menit
    const updateInterval = 1000; // tiap 1 detik
    const increment = (100 / (totalDuration / updateInterval));

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + increment;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  // Login ke backend mini app
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
        backgroundColor: WebApp.themeParams?.bg_color || "#000000",
      }}
    >
      {/* Overlay gradient ringan biar kontras tapi tetap nyatu */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Loading bar (nyatu di bawah) */}
      <div className="relative w-4/5 mb-10 h-2 bg-gray-800/70 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400 rounded-full transition-all duration-500 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
