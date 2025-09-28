import { mutation, query } from "./_generated/server";

export const store = mutation({
  args: {
    username: v.optional(v.string()),
    referredBy: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    deviceName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Called store user without authentication present.");
    }
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    
    if (user !== null) {
      // Update user yang sudah ada
      const updates = {};
      
      if (user.name !== identity.name) {
        updates.name = identity.name;
      }
      
      if (args.username && user.username !== args.username) {
        // Cek jika username sudah dipakai oleh user lain
        const existingUsername = await ctx.db
          .query("users")
          .withIndex("by_username", (q) => q.eq("username", args.username))
          .unique();
        
        if (existingUsername && existingUsername._id !== user._id) {
          throw new Error("Username already taken");
        }
        updates.username = args.username;
        updates.referralCode = args.username; // Update referral code juga
      }
      
      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(user._id, updates);
      }
      
      // Update last active time
      await ctx.db.patch(user._id, { lastActiveAt: Date.now() });
      
      return user._id;
    }
    
    // Validasi referral code jika ada
    let referrer = null;
    if (args.referredBy) {
      referrer = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", args.referredBy))
        .first();
      
      if (!referrer) {
        throw new Error("Invalid referral code");
      }
    }
    
    // Validasi username unik untuk user baru
    if (args.username) {
      const existingUsername = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", args.username))
        .unique();
      
      if (existingUsername) {
        throw new Error("Username already taken");
      }
    }
    
    // Buat user baru
    const userId = await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "",
      tokenIdentifier: identity.tokenIdentifier,
      imageUrl: identity.pictureUrl,
      username: args.username,
      referralCode: args.username, // referral code = username
      referredBy: args.referredBy,
      referredUsers: [],
      hasUsedReferral: !!args.referredBy,
      ipAddress: args.ipAddress,
      deviceName: args.deviceName,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });
    
    // Update referredUsers array untuk referrer
    if (referrer) {
      await ctx.db.patch(referrer._id, {
        referredUsers: [...referrer.referredUsers, userId]
      });
    }
    
    return userId;
  },
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Not Authenticated.");
    }
    
    const user = await ctx.db.query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
      
    if (!user) {
      throw new Error("User not found 😭");
    }
    
    return user;
  },
});

// Query untuk mendapatkan stats referral
export const getReferralStats = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Not Authenticated.");
    }
    
    const user = await ctx.db.query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
      
    if (!user) {
      throw new Error("User not found");
    }
    
    // Get detailed info about referred users
    const referredUsersDetails = await Promise.all(
      user.referredUsers.map(userId => ctx.db.get(userId))
    );
    
    return {
      referralCode: user.referralCode,
      totalReferrals: user.referredUsers.length,
      referredUsers: referredUsersDetails.filter(Boolean),
      referredBy: user.referredBy
    };
  },
});

// Mutation untuk update username dan referral code
export const updateUsername = mutation({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Not Authenticated.");
    }
    
    const user = await ctx.db.query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
      
    if (!user) {
      throw new Error("User not found");
    }
    
    // Cek jika username sudah dipakai
    const existingUsername = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();
    
    if (existingUsername && existingUsername._id !== user._id) {
      throw new Error("Username already taken");
    }
    
    // Update username dan referral code
    await ctx.db.patch(user._id, {
      username: args.username,
      referralCode: args.username
    });
    
    return { success: true };
  },
});

/*
import { mutation, query } from "./_generated/server";

export const store = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		
		if (!identity) {
			throw new Error("Called store user without authentication present.");
		}
		
		const user = await ctx.db
		  .query("users")
			.withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
			.unique();
		
		if (user !== null) {
			if (user.name !== identity.name) {
				await ctx.db.patch(user._id, { name: identity.name});
			}
			
			return user._id;
		}
		
		return await ctx.db.insert("users", {
			name: identity.name ?? "Anonymouse",
			tokenIdentifier: identity.tokenIdentifier,
			email: identity.email,
			imageUrl: identity.pictureUrl,
			createdAt: Date.now(),
			lastActiveAt: Date.now(),
		});
	},
	
});

export const getCurrentUser = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		
		if (!identity) {
			throw new Error("Not Authenticated.");
		}
		
		const user = await ctx.db.query("users")
		  .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
			.unique();
			
		if (!user) {
			throw new Error("User not found 😭");
		}
		
		return user;
	},
});
*/