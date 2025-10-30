import React, { FC } from "react";

interface BrandingProps {
  title: string;
  message: string;
  image?: string;
}

const Branding: FC<BrandingProps> = ({ image, title, message }) => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative overflow-hidden rounded-2xl lg:rounded-3xl">
      {/* Background Image dengan Overlay Gradient */}
      <div className="absolute inset-0">
        <img
          src={image || "/assets/branding.png"}
          alt="branding"
          className="w-full h-full object-cover transform -scale-x-100"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-emerald-900/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
        <div className="space-y-3 md:space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
            <span className="text-xs font-semibold text-emerald-300">ECROP 100</span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            {title}
          </h2>

          {/* Message */}
          <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-md">
            {message}
          </p>

          {/* Decorative Elements */}
          <div className="flex space-x-2 pt-3 md:pt-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400/60"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;


/* v11
import React, { FC } from "react";

interface BrandingProps {
  title: string;
  message: string;
  image?: string;
}

const Branding: FC<BrandingProps> = ({ image, title, message }) => {
  return (
    <div className="ps-0 py-4 hidden lg:block">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <img
          src={image || "/assets/branding.png"}
          alt="branding"
          className="h-full w-full object-cover -scale-x-100 transform"
        />

        <div className="absolute inset-0 bg-slate-900/50 flex items-end justify-center">
          <div className="p-6 text-start">
            <h5 className="mb-3 text-2xl font-bold text-white leading-snug">
              ECROP 100 - TOKEN CREATOR
              <br />
              <span className="text-green-400">{title}</span>
            </h5>
            <p className="text-gray-300 text-base font-medium max-w-sm">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
*/