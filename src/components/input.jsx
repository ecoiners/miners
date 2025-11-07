import { Check, X } from "lucide-react";

// Komponen Input umum dengan ikon di kiri
export const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>

      <input
        {...props}
        className="pl-10 pr-3 py-2 w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 
                   focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 
                   transition duration-200"
      />
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
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.meter ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={item.meter ? "text-green-500" : "text-gray-500"}>
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

  const getColors = (index) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Sangat Lemah";
    if (strength === 1) return "Lemah";
    if (strength === 2) return "Cukup";
    if (strength === 3) return "Bagus";
    return "Kuat";
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">Kekuatan Password</span>
        <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColors(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};