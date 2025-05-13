import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../databases/realtimedatabase";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes:["profileImageGet", "locationGet","getOrders"],
    endpoints: ( builder )=> ({
        getCategories: builder.query({
            query: () => 'categories.json',
        }), 
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            // formatear estos datos
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),
        getProductById : builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                if(responseTransformed.length) return responseTransformed[0]
                return null
            }
        }),


        postOrder: builder.mutation({
          query: ({ ...order }) => ({
            url: "orders.json",
            method: "POST",
            body: order,
          }),
          invalidatesTags: ["getOrders"],
        }),
        getOrders: builder.query({
          query: () => `orders.json?`,
          providesTags: ["getOrders"],
        }),

        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags:['profileImageGet']
         }),

         postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
              url: `profileImages/${localId}.json`,
              method: 'PUT',
              body: { image },
            }),
            invalidatesTags: ['profileImageGet'], // Esto debe estar dentro de la mutación
          }),

          getLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
            providesTags: ["locationGet"],
          }),

          postLocation: builder.mutation({
            query: ({ location, localId }) => ({
              url: `locations/${localId}.json`,
              method: "PUT",
              body: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
                updatedAt: location.updatedAt,
              },
            }),
            invalidatesTags: ["locationGet"], 
          })
        }),
      });

export const {
     useGetCategoriesQuery,
     useGetProductsByCategoryQuery, 
     useGetProductByIdQuery,
     usePostOrderMutation,
     useGetOrdersQuery,
     useGetProfileImageQuery,
     usePostProfileImageMutation,
     useGetLocationQuery,
     usePostLocationMutation, 
    } = shopApi;