import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { INote } from '../model/INote'

export const noteApi = createApi({
    reducerPath: 'noteAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getNotesFromServer: builder.query<INote[], number>({
            query: (limit = 10) => ({
                url: `todos/`,
                params: {
                    _limit: limit
                }
            })
        }),
    }),
})
