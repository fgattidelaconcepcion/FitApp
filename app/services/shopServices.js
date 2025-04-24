import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../databases/realtimedatabase";

export const shopApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    endpoints: ( builder )=> ({
        getCategories: builder.query({
            query: () => 'categories.json',
        }), 
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
            // formatear estos datos
        }),
        getProductById : builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo="${productId}"`
        })
    })
})

export const {useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery} = shopApi;
