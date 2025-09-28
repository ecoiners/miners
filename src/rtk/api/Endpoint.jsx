import BaseQuery from "./BaseQuery";

const InjectEndpoint = BaseQuery.injectEndpoints({
    endpoints: (builder) => ({
        CreateAccount: builder.mutation({
            query: (arg) => ({
                url: '/create-account',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ["user"]
        }),
        MakeWithdraw: builder.mutation({
            query: (arg) => ({
                url: '/make-withdraw',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ["user", "Withdraw", "task"]
        }),
        MarkAsComplete: builder.mutation({
            query: (arg) => ({
                url: '/complete-task',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ["task"]
        }),
        FindAccount: builder.query({
            query: (arg) => ({
                url: '/find-account',
                method: 'GET',
                params: {
                    userId: arg
                }
            }),
            providesTags: ["user"]
        }),
        TaskList: builder.query({
            query: (arg) => ({
                url: '/task-list',
                method: 'GET',
                params: {
                    userId: arg
                }
            }),
            providesTags: ["task"]
        }),
        PointTable: builder.query({
            query: (arg) => ({
                url: '/point-table',
                method: 'GET',
                params: {
                    id: arg
                }
            }),
            providesTags: ["task"]
        }),
        UpdateAccount: builder.mutation({
            query: (arg) => ({
                url: '/update-account',
                method: 'PUT',
                body: arg
            }),
            invalidatesTags: ["user"]
        }),
        Leaderboard: builder.query({
            query: (arg) => ({
                url: '/leaderboard',
                method: 'GET',
                params: {
                    id: arg
                }
            }),
            providesTags: ["task"]
        }),
        ReferredSomeone: builder.mutation({
            query: (arg) => ({
                url: '/referred-someone',
                method: 'PUT',
                body: arg
            }),
            invalidatesTags: ["user"]
        }),
        UpdateLastPlayedGameTime: builder.mutation({
            query: (arg) => ({
                url: '/admin/update-game-time',
                method: 'PUT',
                body: arg
            }),
            invalidatesTags: ["user", "task", "Withdraw", "Game", "AdminTask"]
        }),
        GetWithdrawStatus: builder.query({
            query: (arg) => ({
                url: '/admin/withdraw-status',
                method: 'GET',
                params: {
                    userId: arg
                }
            }),
            providesTags: ["Withdraw"]
        }),
        SingleTappingGame: builder.mutation({
            query: (arg) => ({
                url: '/new-tap',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ["Game"]
        }),
        RequestForClaim: builder.mutation({
            query: (arg) => ({
                url: '/claim-game-point',
                method: 'POST',
                body: { id: arg }
            }),
            invalidatesTags: ["Game", "user", "Withdraw", "task"]
        }),
        ClaimAblePointForTapping: builder.query({
            query: (arg) => ({
                url: '/claimable-point',
                method: 'GET',
                params: { id: arg }
            }),
            providesTags: ["Game"]
        }),
        ReferList: builder.query({
            query: (arg) => ({
                url: '/refer-list',
                method: 'GET',
                params: { id: arg }
            })
        }),

        Transection: builder.mutation({
            query: (arg) => ({
                url: '/transection/complete',
                method: "PUT",
                body: { userId: arg }
            }),
            invalidatesTags: ["user", "task"]
        }),
        InviteTask: builder.mutation({
            query: (arg) => ({
                url: '/invite/complete',
                method: "PUT",
                body: { userId: arg?.userId, refer_count: arg?.refer_count}
            }),
            invalidatesTags: ["user", "task"]
        }),
        Invite10Task: builder.mutation({
            query: (arg) => ({
                url: '/invite/complete',
                method: "PUT",
                body: { userId: arg }
            }),
            invalidatesTags: ["user", "task"]
        }),
        VerifyTon: builder.mutation({
            query: (arg) => ({
                url: '/verify-transaction',
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["user", "task"]
        })
    })
});

export const {useVerifyTonMutation, useInvite10TaskMutation, useInviteTaskMutation, useTransectionMutation, useReferListQuery, useUpdateLastPlayedGameTimeMutation, useRequestForClaimMutation, useClaimAblePointForTappingQuery, useSingleTappingGameMutation, useGetWithdrawStatusQuery, useCreateAccountMutation, useMakeWithdrawMutation, useMarkAsCompleteMutation, useUpdateAccountMutation, useFindAccountQuery, useLeaderboardQuery, useTaskListQuery, usePointTableQuery } = InjectEndpoint;
