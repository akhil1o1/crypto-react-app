import 'dotenv/config';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
    'X-RapidAPI-Key': process.env.COINRANKING_RAPID_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = "https://coinranking1.p.rapidapi.com/coins"; 

const createRequest = (url) => ({url, headers: cryptoHeaders});

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest("/exchanges")
        })
    })
});
 
