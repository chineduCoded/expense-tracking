import { configureStore } from "@reduxjs/toolkit"
import expenseReducer  from "./reducer"
import { expenseApi } from "./expenseApi"


export const store = configureStore({
    reducer: {
        expense: expenseReducer,
        [expenseApi.reducerPath]: expenseApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(expenseApi.middleware)
})