import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
  // Handle data, loading, error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback( async () => {
    // When fetching
    setLoading(true)
    try {
        // Get response
      const response = await axiosInstance({
        url,
      });
      setTimeout(()=> {
        // Set data
        setData(response?.data?.data)
        // Set loading false
        setLoading(false)
      }, 1000)
    } catch (error) {
        // Set error
        setError(error.message || 'Something went wrong!')
    }finally{
        // Set loading
        setLoading(false)
    }
  },[url])

  // Render when loading page
  useEffect(()=> {
fetchData()
  },[fetchData])
// send response
  return [data, loading, error, fetchData]
};
