import { useContext } from "react";
import { DataProviderContes } from "../providers/DataProvider";

export function useData() {
  const dataContex = useContext(DataProviderContes);
  if (!dataContex) {
    throw new Error("Data context is not available.");
  }

  // Perform input validation and sanitization for authContext if necessary

  return dataContex;
}
