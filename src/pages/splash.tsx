import WebApp from "@twa-dev/sdk";
import { useLoginUserMutation } from "../api/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashimage from "../assets/images/splash.png";

export default function Splash() {
  const [loginUser, { data, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  // Auto login telegram
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
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${splashimage})`,
        backgroundColor: WebApp.themeParams?.bg_color || "#000000",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      {/* Overlay halus biar gambar tetap kontras di semua tema */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Spinner di tengah */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
