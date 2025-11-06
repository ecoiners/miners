import { useState } from "react";
import { User, Mail, Lock, Gift, Check, X, Eye, EyeOff } from "lucide-react"; 
import { Link } from "react-router-dom";

// Komponen Input umum dengan ikon di kiri
export const Input = ({ icon: Icon, type = "text", ...props }) => {
  return (
    <div className="form-control w-full mb-4">
      <label className="input input-bordered flex items-center gap-2 bg-base-200 border-base-300">
        <Icon className="w-4 h-4 text-primary" />
        <input 
          type={type}
          {...props} 
          className="grow bg-transparent placeholder-opacity-70"
        />
      </label>
    </div>
  );
};

// Komponen Input Password dengan toggle visibility
export const PasswordInput = ({ icon: Icon, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control w-full mb-4">
      <label className="input input-bordered flex items-center gap-2 bg-base-200 border-base-300">
        <Icon className="w-4 h-4 text-primary" />
        <input 
          type={showPassword ? "text" : "password"}
          {...props} 
          className="grow bg-transparent placeholder-opacity-70"
        />
        <button 
          type="button"
          className="btn btn-ghost btn-sm p-1 min-h-0 h-auto"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </label>
    </div>
  );
};

// ✅ Komponen kriteria kekuatan password
const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "Minimal 8 karakter", meter: password.length >= 8 },
    { label: "Mengandung huruf besar", meter: /[A-Z]/.test(password) },
    { label: "Mengandung huruf kecil", meter: /[a-z]/.test(password) },
    { label: "Mengandung angka", meter: /\d/.test(password) },
    { label: "Mengandung simbol", meter: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-3 space-y-2">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-sm">
          {item.meter ? (
            <Check className="w-4 h-4 text-success mr-2" />
          ) : (
            <X className="w-4 h-4 text-error mr-2" />
          )}
          <span className={item.meter ? "text-success" : "text-base-content text-opacity-60"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ✅ Komponen utama pengukur kekuatan password
export const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthColor = () => {
    if (strength === 0) return "text-error";
    if (strength === 1) return "text-error";
    if (strength === 2) return "text-warning";
    if (strength === 3) return "text-warning";
    return "text-success";
  };

  const getProgressColor = () => {
    if (strength === 0) return "bg-error";
    if (strength === 1) return "bg-error";
    if (strength === 2) return "bg-warning";
    if (strength === 3) return "bg-warning";
    return "bg-success";
  };

  const getStrengthText = () => {
    if (strength === 0) return "Sangat Lemah";
    if (strength === 1) return "Lemah";
    if (strength === 2) return "Cukup";
    if (strength === 3) return "Bagus";
    return "Kuat";
  };

  return (
    <div className="mt-4 p-4 bg-base-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-base-content">Kekuatan Password</span>
        <span className={`text-sm font-bold ${getStrengthColor()}`}>
          {getStrengthText()}
        </span>
      </div>

      {/* Progress Bar */}
      <progress 
        className={`progress w-full h-2 ${getProgressColor()}`} 
        value={strength} 
        max="4"
      ></progress>

      {/* Kriteria Password */}
      <PasswordCriteria password={password} />
    </div>
  );
};
