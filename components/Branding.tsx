import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BrandingProps {
  title: string;
  message: string;
  image?: string;
}

const Branding: FC<BrandingProps> = ({ image, title, message }) => {
  return (
    <Card className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative overflow-hidden border-0 bg-transparent">
      <CardContent className="p-0 h-full">
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
            <Badge 
              variant="secondary" 
              className="bg-emerald-500/20 border-emerald-400/30 text-emerald-300 backdrop-blur-sm px-3 py-1 text-xs font-semibold"
            >
              ECROP 100
            </Badge>

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
      </CardContent>
    </Card>
  );
};

export default Branding;