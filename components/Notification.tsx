import React, { useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import useNotificationStore from "@/stores/useNotificationStore";
import { useNetworkConfiguration } from "@/context/NetworkConfigurationProvider";
import NotificationSVG from "./SVG/NotificationSVG";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle2, AlertCircle, Info, TriangleAlert } from "lucide-react";

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s: any) => s
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="pointer-events-none fixed inset-4 z-[9999] flex flex-col items-end space-y-3 sm:space-y-4">
      {reversedNotifications.map((notif, index) => (
        <Notification
          key={`${notif.message}-${index}`}
          type={notif.type}
          message={notif.message}
          description={notif.description}
          txid={notif.txid}
          onHide={() => {
            setNotificationStore((state: any) => {
              const reversedIndex = reversedNotifications.length - 1 - index;
              state.notifications = [
                ...notifications.slice(0, reversedIndex),
                ...notifications.slice(reversedIndex + 1),
              ];
            });
          }}
        />
      ))}
    </div>
  );
};

interface NotificationProps {
  type: string;
  message: string;
  description?: string;
  txid?: string;
  onHide: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  description,
  txid,
  onHide,
}) => {
  const { networkConfiguration } = useNetworkConfiguration();
  const { connection } = useConnection();

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000); // 8 detik
    return () => clearTimeout(id);
  }, [onHide]);

  const getVariant = () => {
    switch (type) {
      case "success":
        return "default";
      case "info":
        return "default";
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "error":
        return <TriangleAlert className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Alert 
      variant={getVariant()} 
      className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-slate-900/90 backdrop-blur-xl border-slate-700 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <AlertTitle className="text-white font-semibold text-base">
                {message}
              </AlertTitle>
              {description && (
                <AlertDescription className="text-gray-300 mt-1 text-sm">
                  {description}
                </AlertDescription>
              )}
            </div>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onHide}
              className="h-7 w-7 flex-shrink-0 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Transaction ID */}
          {txid && (
            <div className="flex items-center justify-between gap-2 pt-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getBadgeColor()}`}
              >
                {type.toUpperCase()}
              </Badge>
              
              <a
                href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-teal-400 hover:text-green-400 text-xs transition-colors"
              >
                <NotificationSVG  className="h-3 w-3"/>
                <span className="font-mono">
                  {txid.slice(0, 6)}...{txid.slice(txid.length - 6)}
                </span>
              </a>
            </div>
          )}

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-1 mt-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-8000 ease-linear ${
                type === "success" ? "bg-green-500" :
                type === "info" ? "bg-blue-500" :
                type === "error" ? "bg-red-500" : "bg-gray-500"
              }`}
              style={{ 
                animation: 'shrink 8s linear forwards',
                transformOrigin: 'left center'
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </Alert>
  );
};

export default NotificationList;
