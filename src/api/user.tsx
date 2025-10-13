import BaseApi from "../baseapi";

const UserEndpoints = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ✅ PAKE RETURN OBJECT
        loginUser: builder.mutation({
            query: (body) => ({
                url: "/api/v1/login",
                method: "POST",
                body: body
            }),
        }),
    }),
});

// ✅ EXPORT HOOKS LANGSUNG
export const { useLoginUserMutation } = UserEndpoints;


/* versi 1
import BaseApi from "../baseapi";

const UserEndpoints = BaseApi.injectEndpoints({
	endpoints: (builder) => {
		LoginUser: builder.mutation({
			query: (arg) => ({
				url: "/api/v1/login",
				method: "POST",
				body: arg
			}),
		}),
	},
});

const User = {
	LoginUser: UserEndpoints.useLoginUserMutation
};

export default User;
*/
