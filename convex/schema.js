import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		email: v.string(),
		tokenIdentifier: v.string(),
		imageUrl: v.optional(v.string()),
		username: v.optional(v.string()),
		
		// Data registrasi dan keamanan
		ipAddress: v.optional(v.string()), // Alamat IP saat registrasi
		deviceName: v.optional(v.string()), // Nama device yang digunakan
		
		// Sistem referral
		referralCode: v.string(), // Kode referral unik untuk user ini
		invitedBy: v.optional(v.id("users")), // User yang menginvite (max 1 kali)
		totalReferrals: v.number(), // Total orang yang diinvite oleh user ini
		
		// Timestamps
		createAt: v.number(),
		lastActiceAt: v.number(),
	})
	.index("by_token", ["tokenIdentifier"])
	.index("by_referral_code", ["referralCode"]) // Untuk mencari user by referral code
	.index("by_invited_by", ["invitedBy"])  // Untuk mencari semua user yang diinvite oleh seseorang
	.index("by_username", ["username"])
	.searchIndex("search_name", {searchField: "name"})
	.searchIndex("search_email", {searchField: "email"})
	.searchIndex("search_total_refferals", {searchField: " totalRefferals"}),
});