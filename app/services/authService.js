import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, apiKey } from "../databases/users";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password }) => ({ // Desestructura para obtener solo email y password
        url: `/accounts:signUp?key=${apiKey}`,
        method: "POST",
        body: { email, password, returnSecureToken: true }, // Envía solo las propiedades necesarias
      }),
    }),
    signIn: builder.mutation({
      query: ({ email, password }) => ({ // Desestructura para obtener solo email y password
        url: `/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        body: { email, password, returnSecureToken: true }, // Envía solo las propiedades necesarias
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;

// Recuerda mantener tu apiKey en un lugar seguro, como variables de entorno.
// export const apiKey = "AIzaSyDRxcpgedeK3jBXSSdZc8W4mlx9nLen8FE";
// export const baseUrl = "https://identitytoolkit.googleapis.com/v1";