import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseURI = "http://localhost:8080"
export const expenseApi = createApi({
    reducerPath: "expenseApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseURI}),
    endpoints: builder => ({
        // get categories
        getCategories: builder.query({
            query: () => "/api/categories",
            providesTags: ["categories"]
        }),

        // get Labels
       getLabels: builder.query({
           query: () => "/api/labels",
           providesTags: ["transaction"]
       }),

        // add transaction
       addTransaction: builder.mutation({
          query: (initialTransaction) => ({
            url: "/api/transaction",
            method: "POST",
            body: initialTransaction
          }),
          invalidatesTags: ["transaction"]
       }),

        // delete transaction
       deleteTransaction: builder.mutation({
           query: recordId => ({
            url: "/api/transaction",
            method: "DELETE",
            body: recordId
           }),
           invalidatesTags: ["transaction"]
       })
    })
})

export const { useGetCategoriesQuery, useGetLabelsQuery, useAddTransactionMutation, useDeleteTransactionMutation } = expenseApi