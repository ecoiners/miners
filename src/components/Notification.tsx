import React, { useEffect } from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useConnection } from "@solana/wallet-adapter-react";
import useNotificationStore from "../stores/useNotificationStore";
import { useNetworkConfiguration } from "../context/NetworkConfigurationProvider";
import NotificationSVG from "./SVG/NotificationSVG";

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[9999] flex flex-col space-y-3 sm:space-y-4">
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

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="text-green-400 h-7 w-7" />;
      case "info":
        return <InformationCircleIcon className="text-blue-400 h-7 w-7" />;
      case "error":
        return <XCircleIcon className="text-red-500 h-7 w-7" />;
      default:
        return <InformationCircleIcon className="text-gray-400 h-7 w-7" />;
    }
  };

  return (
    <div className="pointer-events-auto transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-xl shadow-lg overflow-hidden w-[92vw] sm:w-80">
      <div className="flex items-start p-4">
        {/* Icon */}
        <div className="flex-shrink-0">{getIcon()}</div>

        {/* Text */}
        <div className="ml-3 w-0 flex-1 text-left">
          <p className="text-white font-semibold">{message}</p>
          {description && (
            <p className="text-gray-400 mt-1 text-sm">{description}</p>
          )}

          {txid && (
            <a
              href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
              target="_blank"
              rel="noreferrer"
              className="text-teal-400 hover:text-green-400 mt-2 text-xs inline-flex items-center gap-1"
            >
              <NotificationSVG />
              <span>
                {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
              </span>
            </a>
          )}
        </div>

        {/* Close button */}
        <div className="ml-4 flex-shrink-0 self-start">
          <button
            onClick={onHide}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-md p-1 transition-all duration-300"
          >
            <XIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;



/* v 1
import React, { useEffect, useState } from "react";
import {
	CheckCircleIcon,
	InformationCircleIcon,
	XCircleIcon,
	XIcon
} from "@heroicons/react/outline";
import { useConnection } from "@solana/wallet-adapter-react";
import useNotificationStore from "../stores/useNotificationStore";
import { useNetworkConfiguration } from "../context/NetworkConfigurationProvider";

import NotificationSVG from "./SVG/NotificationSVG";

const NotificationList = () => {
	const {
		notifications,
		set: setNotificationStore
	} = useNotificationStore((s) => s);
	
	const reversedNotifications = [...notifications].reverse();
	
	return (
		<div className="pointer-events-none fixed inset-0 z-90 flex items-end px-4 py-6 sm:p-6">
		  <div className="flex w-full flex-col">
			  {
					reversedNotifications.map((notif, index) => (
						<Notification 
						  key={`${notif.message} ${index}`}
							type={notif.type}
							message={notif.message}
							description={notif.description}
							txid={notif.txid}
							onHide={() => {
								setNotificationStore((state: any) => {
									const reversedIndex = reversedNotifications.length - 1 - index;
									state.notifications = [
										...notifications.slice(0, reversedIndex),
										...notifications.slice(reversedIndex + 1)
									];
								});
								
							}}
						/>
					))
				}
			</div>
		</div>
	);
};

const Notification = ({type, message, description, txid, onHide}) =>{
	const connection = useConnection();
	const { networkConfiguration } = useNetworkConfiguration();
	
	useEffect(() => {
		const id = setTimeout(() => {
			onHide();
			
		}, 8000);
		
		return () => {
			clearInterval(id)
		};
		
	}, [onHide]);
	
	return (
		<div className="bg-bkg-1 pointer-events-auto bg-slate-900/60 rounded-md z-90 overflow-hidden mx-4 mt-2 mb-12 p-2 shadow-lg right-1 w-full max-w-sm">
		  <div className="p-4">
			  <div className="flex items-center">
				
				  <div className="flex-shrink-0">
					  {type === "success" ? (
							<CheckCircleIcon className="text-success mr-1 h-8 w-8"/>
						) : null}
						
						{type === "info" ? (
							<InformationCircleIcon className="text-info mr-1 h-8 w-8" />
						) : null}
						
						{type === "error" ? (
							<XCircleIcon className="text-error mr-1 h-8 w-8" />
						):null}
					</div>
					
					<div className="ml-2 w-0 flex-1">
					  <div className="text-yellow-600 font-bold">{message}</div>
						{description ? (
							<p className="text-yellow-300 mt-0.5 text-sm">
							  {description}
							</p>
						) : null}
						
						{txid ? (
							<div className="flex flex-row">
							  <a 
								  href={`https//explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
									target="_blank"
									className="link-accent link flex flex-row"
									rel="noreferrer"
								>
								  <NotificationSVG />
									<div className="mx-4 flex">
									  {txid.slice(0, 8)}....
										{txid.slice(txid.length -8)}
									</div>
								</a>
							</div>
						) : null}
					</div>
					
					<div className="ml-4 flex flex-shrink-0 self-start">
					  <button onClick={() => onHide()} className="bg-bkg-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold border-none transition-all duration-300 rounded-md inline-flex focus:outline-none ">
						  <span className="sr-only">Close</span>
							<XIcon className="h-5 w-5"/>
						</button>
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default NotificationList;

*/