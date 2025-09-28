import BaseQuery from "./BaseQuery";

const AdminEndpoint = BaseQuery.injectEndpoints({
    endpoints: (builder) => ({
        LoginAdmin: builder.mutation({
            query: (arg) => ({
                url: '/admin/login',
                body: arg,
                method: 'POST'
            })
        }),
        AddTask: builder.mutation({
            query: (arg) => ({
                url: '/create-task',
                body: arg,
                method: 'POST'
            }),
            invalidatesTags: ["AdminTask"]
        }),
        UpdateTask: builder.mutation({
            query: (arg) => ({
                url: '/update-task',
                body: arg,
                method: 'PUT'
            }),
            invalidatesTags: ["AdminTask"]
        }),
        AdminTaskList: builder.query({
            query: (arg) => ({
                url: '/admin/task',
                method: 'GET',
                params: {
                    title: arg?.SearchTitle,
                    type: arg?.tab
                }
            }),
            providesTags: ["AdminTask"]
        }),
        Statistic: builder.query({
            query: () => ({
                url: '/statistic',
                method: 'GET',
            }),
        }),
        LeaderboardAdmin: builder.query({
            query: () => ({
                url: '/admin/leaderboard',
                method: 'GET'
            }),
            providesTags: ["task"]
        }),
        WithdrawList: builder.query({
            query: (arg) => ({
                url: '/admin/withdraw-list',
                method: 'GET',
                params: {
                    status: arg
                }
            }),
            providesTags: ["Withdraw"]
        }),
        WithdrawCancel: builder.mutation({
            query: (arg) => ({
                url: '/admin/cancel-withdraw',
                method: 'PUT',
                body: {
                    id: arg
                }
            }),
            invalidatesTags: ["Withdraw"]
        }),
        WithdrawRecheck: builder.mutation({
            query: (arg) => ({
                url: '/admin/recheck-withdraw',
                method: 'PUT',
                params: {
                    id: arg
                }
            }),
            invalidatesTags: ["Withdraw"]
        }),
        WithdrawPaid: builder.mutation({
            query: (arg) => ({
                url: '/admin/paid-withdraw',
                method: 'PUT',
                body: {
                    id: arg
                }
            }),
            invalidatesTags: ["Withdraw"]
        }),
        UpdateUserPoint: builder.mutation({
            query: (arg) => ({
                url: '/admin/update-point',
                method: 'PUT',
                body: arg
            }),
            invalidatesTags: ["user", "AdminTask", "Withdraw", "task"]
        }),
    })
});

export const { useStatisticQuery, useUpdateUserPointMutation, useWithdrawRecheckMutation, useLeaderboardAdminQuery, useWithdrawPaidMutation, useWithdrawCancelMutation, useWithdrawListQuery, useLazyWithdrawListQuery, useLoginAdminMutation, useAddTaskMutation, useUpdateTaskMutation, useAdminTaskListQuery } = AdminEndpoint;