import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const apiUrl = "https://ecrop-backend.vercel.app/api/v1/auth";

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckAuth: true,
	message: null,
	
	register: async (username, email, password, referralCode) => {
		set({isLoading: true, error: null});
		
		try {
		  const response = await axios.post(`${apiUrl}/register`, {username, email, password, referralCode});
			set({user: response.data.user, isAuthenticated: true, isLoading:false});
			
		} catch (error) {
			set({error: error.response.data.message, isLoading:false});
			throw error;
		}
	},
	
	verifyEmail: async (code) => {
		set({isLoading: true, error: null});
		
		try {
			const response = await axios.post(`${apiUrl}/verify-email`, {code});
			set({user: response.data.user, isAuthenticated: true, isLoading:false});
			
			return response.data;
			
		} catch (error) {
			set({error: error.response.data.message, isLoading:false});
			throw error;
		}
	},
	
	login: async (email, password) => {
		set({isLoading: true, error: null});
		
		try {
			const response = await axios.post(`${apiUrl}/login`, {email, password});
			set({user: response.data.user, isAuthenticated: true, error: null, isLoading: false})
			
		} catch (error) {
			set({error: error.response?.data?.message , isLoading: false})
			throw error
		}
	},
	
	checkAuth: async () => {
		set({isCheckAuth: true, error: null});
		
		try {
		  const response = await axios.get(`${apiUrl}/check-auth`);
			set({user: response.data.user, isAuthenticated: true, isCheckAuth: false})
		} catch (error) {
			set({error: null, isCheckAuth: false, isAuthenticated: false});
			throw error;
	  }
	},
	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${apiUrl}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${apiUrl}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${apiUrl}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
}))