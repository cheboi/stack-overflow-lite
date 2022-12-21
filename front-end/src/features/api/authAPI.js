import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/user/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),

  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: 'http://localhost:4000/questions',
        method: 'GET',
      }),
    }),
  }),
})

// export react hook
export const { useGetDetailsQuery } = authApi