

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.jsonbin.io/v3/b/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-Master-Key",
        "$2a$10$wYLVusv1vQx5beP6t.0AjO0ijZWX6aaEJ7JgTQJx2wMJQhSPtaNNa"
      );
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Reports"], // Used for caching and invalidation
  endpoints: (builder) => ({
    // Fetch data from the given JSONBin API
    getReports: builder.query({
      query: (binId) => `${binId}`,
      providesTags: ["Reports"],
    }),

    // Create a new report
    createReport: builder.mutation({
      query: ({ binId, newReport }) => ({
        url: `${binId}/records`,
        method: "POST",
        body: newReport,
      }),
      invalidatesTags: ["Reports"],
    }),

    // Update an existing report
    updateReport: builder.mutation({
      query: ({ binId, id, ...updatedReport }) => ({
        url: `${binId}/records/${id}`,
        method: "PUT",
        body: updatedReport,
      }),
      invalidatesTags: ["Reports"],
    }),

    // Delete a report
    deleteReport: builder.mutation({
      query: ({ binId, id }) => ({
        url: `${binId}/records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetReportsQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = apiSlice;
