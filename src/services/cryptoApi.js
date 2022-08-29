import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
 
const cryptoHeaders = {
    'X-RapidAPI-Key': "e5664d8631msh7986803c20bd967p158b33jsn1b4ffc1b0108",
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = "https://coinranking1.p.rapidapi.com"; 

const createRequest = (url) => ({url, headers: cryptoHeaders});

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        })
    })
});
 
export const {useGetCryptosQuery} = cryptoApi;
