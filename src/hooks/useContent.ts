"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Custom hook to fetch content from a given URL.
 * @param {string} url - The URL to fetch content from.
 * @returns {{ data: any, isLoading: boolean, error: any }} - The fetched data, loading state, and error if any.
 */
const useContent = (url: string) => {
  const fetchContent = async () => {
    if (!url) throw new Error("URL is required");
    try {
      const response = await axios.get(url);
      return { rawContent: response.data };
    } catch (e) {}
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["content", url],
    queryFn: fetchContent,
    enabled: !!url, // Only run query if URL is provided
  });

  return { content: data, isLoading, error };
};

export default useContent;
