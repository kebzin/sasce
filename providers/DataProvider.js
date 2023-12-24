import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

export const DataProviderContes = createContext();
export const DataProvider = ({ children }) => {
  const [ItemList, SetITemList] = useState([]);
  return (
    <DataProviderContes.Provider value={{ ItemList, SetITemList }}>
      {children}
    </DataProviderContes.Provider>
  );
};
