import React, { FC } from "react";

interface BrandingProps {
  title: string;
  message: string;
  image?: string;
}

const Branding: FC<BrandingProps> = ({ image, title, message }) => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] relative overflow-hidden rounded-2xl lg:rounded-3xl">
      {/* Background Image dengan Overlay Gradient */}
      <div className="absolute inset-0">
        <img
          src={image || "/assets/branding.png"}
          alt="branding"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/50 to-emerald-900/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-8 lg:p-12 text-white">
        <div className="space-y-4 lg:space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
            <span className="text-sm font-semibold text-emerald-300">ECROP 100</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            {title}
          </h2>

          {/* Message */}
          <p className="text-base lg:text-lg text-gray-200 leading-relaxed max-w-md">
            {message}
          </p>

          {/* Decorative Elements */}
          <div className="flex space-x-2 pt-4">
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400/60"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
