import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { products } from "../constants/dummyData";
import { supabase } from "../lib/superbase";

export const DataProviderContes = createContext();
export const DataProvider = ({ children }) => {
  const [ItemList, SetITemList] = useState(products);
  const [filter, setFilter] = useState("All category");
  const [card, setCard] = useState([]);
  const [sample, setsample] = useState();

  // function to featch the data
  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.log(error);
      }
      setsample(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(sample);
  return (
    <DataProviderContes.Provider
      value={{
        ItemList,
        filter,
        card,
        sample,
        setCard,
        setFilter,
        SetITemList,
      }}
    >
      {children}
    </DataProviderContes.Provider>
  );
};
