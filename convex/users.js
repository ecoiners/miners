import { mutation } from "./generated/server";

export const store = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		
		if (!identity) {
			throw new Error("Called store user without authentication present");
		}
		
		const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
		
		if (user !== null) {
			if (user.name !== identity.name) {
				await ctx.db.patch(user._id, {name: identity.name});
			}
			
			return user._id;
		}
		
		return await ctx.db.insert("users", {
			name: identity.name ?? "Anonymouse",
			tokenIdentifier: identity.tokenIdentifier,
		});
	},
})