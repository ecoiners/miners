import React, { createContext, useContext } from "react";
import toast, {Toaster} from "react-hot-toast";

const toastContext = createContext();

const brandColor = "#13101A";
const toastStyle = {
	common: {
		background: brandColor,
		color: "white",
		padding: "16px",
		borderRadius: "6px",
		boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
	},
	processing: { borderLeft: "4px solid #facc15" },
	approve: { borderLeft: "4px solid #22c55e" },
	complete: { borderLeft: "4px solid #22c55e"},
	reject: { borderLeft: "4px solid #ef4444"},
	failed: { borderLeft: "4px solid #f97316"},
	info: { borderLeft: "4px solid #2ed3c0"}
};

export const ToastProvider = ({children}) => {
	
	// create show toast
	const showProcessing = (message) => {
		return toast.loading(message, {
			style: {
				...toastStyle.common,
				...toastStyle.processing
			},
		});
	};
	
	const showApprove = (message) => {
		return toast.success(message, {
			style: {
				...toastStyle.common,
				...toastStyle.approve
			},
			duration: 5000,
		});
	};
	
	const showComplete = (message) => {
		return toast.success(message, {
			style: {
				...toastStyle.common,
				...toastStyle.complete
			},
			icon: "🥳",
			duration: 5000,
		});
	};
	
	const showRejected = (message) => {
		return toast.error(message, {
			style: {
				...toastStyle.common,
				...toastStyle.reject
			},
			icon: "😭",
			duration: 5000,
		});
	};
	
	const showFailed = (message) => {
		return toast.error(message, {
			style: {
				...toastStyle.common,
				...toastStyle.failed
			},
			icon: "❗",
			duration: 5000,
		});
	};
	
	const showInfo = (message) => {
		return toast.error(message, {
			style: {
				...toastStyle.common,
				...toastStyle.info
			},
			duration: 4000,
		});
	};
	
	// updated toast
	const updateToast = (id, status, message) => {
		toast.dismiss(id);
		
		switch (status) {
			case "processing":
				showProcessing(message);
			case "approve":
				showApprove(message);
			case "complete":
				showComplete(message);
			case "reject":
				showRejected(message);
			case "failed":
				showFailed(message);
			case "info":
			default:
				showInfo(message);
		}
	};
	
	// create notification toast
	const notification = {
		start: (message = "Processing transaction...") => {
			return showProcessing(message);
		},
		update: (id, status, message) => {
			return updateToast(id, status, message);
		},
		approve: (id, status="approve", message = "Transaction approved!") => {
			return updateToast(id, status, message);
		},
		complete: (id, status="complete", message = "Transaction completed successfully!") => {
			return updateToast(id, status, message);
		},
		reject: (id, status="reject", message = "Transaction rejected!") => {
			return updateToast(id, status, message);
		},
		failed: (id, status="failed", message="Transaction failed!") => {
			return updateToast(id, status, message);
		}
	};
	
	return (
		<toastContext.Provider value={{
			showProcessing,
			showApprove,
			showComplete,
			showRejected,
			showFailed,
			showInfo,
			updateToast,
			notification,
			toast
		}}>
		  <Toaster position="bottom-right" toastOptions={{
				success: {
					iconTheme: {
						primary: "#22c55e",
						secondary: "white"
					}
				},
				error: {
					iconTheme: {
						primary: "#ef4444",
						secondary: "white"
					}
				},
			}} />
			{children}
		</toastContext.Provider>
	);
	
};

export const useToast = () => {
	const context = useContext(toastContext);
	
	if (context === undefined) throw new Error("useToast must be used within a ToastProvider");
	
	return context;
};