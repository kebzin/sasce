import React, { createContext, useEffect, useRef, useState } from "react";
import { products } from "../constants/dummyData";
import { supabase } from "../lib/superbase";

export const DataProviderContes = createContext();

export const DataProvider = ({ children }) => {
  const [itemList, setItemList] = useState([]);
  const [filter, setFilter] = useState("All category");
  const [card, setCard] = useState([]);
  const [error, setError] = useState();
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  const isFetchingDataRef = useRef(false); // Use ref to track data fetching

  const fetchData = async () => {
    if (isFetchingDataRef.current) {
      // If data fetching is already in progress, return early
      return;
    }
    setRefreshing(true);
    setIsError(false);
    isFetchingDataRef.current = true; // Set flag to indicate data fetching is in progress

    try {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .order("created_at", { ascending: false, nullsFirst: false })

        .range(itemList.length, itemList.length + 1 * itemList.length + 10)
        .limit(pageSize);

      if (error) {
        setError(error.message);
        setIsError(false);
        setRefreshing(false);

        console.log("error", error);
      }

      setItemList((prevData) => [...prevData, ...(data || [])]);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    } finally {
      setRefreshing(false);
      isFetchingDataRef.current = false; // Reset the data fetching flag
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleOnEndReach = async () => {
    setIsError(false);
    await fetchData();
  };

  return (
    <DataProviderContes.Provider
      value={{
        itemList,
        filter,
        card,
        setCard,
        setFilter,
        refreshData: fetchData,
        handleOnEndReach,
        error,
        setError,
        isError,
        setIsError,
        refreshing,
      }}
    >
      {children}
    </DataProviderContes.Provider>
  );
};
