import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
import { products } from "../constants/dummyData";

export const DataProviderContes = createContext();
export const DataProvider = ({ children }) => {
  const [ItemList, SetITemList] = useState(products);
  const [filter, setFilter] = useState("All category");
  const [card, setCard] = useState([]);
  return (
    <DataProviderContes.Provider
      value={{ ItemList, filter, card, setCard, setFilter, SetITemList }}
    >
      {children}
    </DataProviderContes.Provider>
  );
};
