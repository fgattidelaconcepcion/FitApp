import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiKey } from "../databases/users";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password }) => ({ 
        url: `/accounts:signUp?key=${apiKey}`,
        method: "POST",
        body: { email, password, returnSecureToken: true }, // Envío solo las propiedades necesarias
      }),
    }),
    signIn: builder.mutation({
      query: ({ email, password }) => ({ // Desestructuro para obtener solo email y password
        url: `/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        body: { email, password, returnSecureToken: true }, // Envío solo las propiedades necesarias
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
