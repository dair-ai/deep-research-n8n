import { apiRequest } from "./queryClient";
import type { SearchRequest, SearchResponse } from "@shared/schema";

export async function searchWithWebhook(query: string): Promise<SearchResponse> {
  const response = await apiRequest("POST", "/api/search", { query });
  return response.json();
}
