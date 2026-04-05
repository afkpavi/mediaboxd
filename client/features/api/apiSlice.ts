import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type MediaListArgs = {
    resource: string;
    listType: string;
    page?: number;
};

type MediaItem = {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    overview?: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
};

type MediaListResponse = {
    page: number;
    results: MediaItem[];
    total_pages: number;
    total_results: number;
};

const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3/",
        prepareHeaders: (headers) => {
            if (apiToken) {
                headers.set("Authorization", `Bearer ${apiToken}`);
            }

            headers.set("Accept", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMediaList: builder.query<MediaListResponse, MediaListArgs>({
            query: ({ resource, listType, page = 1 }) => ({
                url: `${resource}/${listType}`,
                params: { page },
            }),
        }),
    }),
});

export const { useGetMediaListQuery } = apiSlice;

export default apiSlice;