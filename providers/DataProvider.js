import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
import { products } from "../constants/dummyData";

export const DataProviderContes = createContext();
export const DataProvider = ({ children }) => {
  const [ItemList, SetITemList] = useState(products);
  return (
    <DataProviderContes.Provider value={{ ItemList, SetITemList }}>
      {children}
    </DataProviderContes.Provider>
  );
};
