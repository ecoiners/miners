import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    
    // Data device dan IP
    ipAddress: v.optional(v.string()),
    deviceName: v.optional(v.string()),
    
    // Sistem referral
    referralCode: v.optional(v.string()), // Kode referral user ini (biasanya = username)
    referredBy: v.optional(v.string()),   // Username yang mengundang user ini
    referredUsers: v.array(v.string()),   // ✅ BENAR - Array of user IDs yang berhasil di-refer
    hasUsedReferral: v.boolean(),         // Apakah user ini sudah menggunakan kode referral
    
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
  .index("by_token", ["tokenIdentifier"])
  .index("by_email", ["email"])
  .index("by_username", ["username"])
  .index("by_referral_code", ["referralCode"])
  .index("by_referred_by", ["referredBy"])
  .searchIndex("search_name", { searchField: "name" })
  .searchIndex("search_email", { searchField: "email" })
});


/*

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		email: v.string(),
		tokenIdentifier: v.string(),
		imageUrl: v.optional(v.string()),
		username: v.optional(v.string()),
		
		createAt: v.number(),
		lastActiveAt: v.number(),
		
	})
	.index("by_token", ["tokenIdentifier"])
	.index("by_email", ["email"])
	.index("by_username", ["username"])
	.searchIndex("search_name", { searchField: "name"})
	.searchIndex("search_email", { searchField: "email"})
}); */