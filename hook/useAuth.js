import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth context is not available.");
  }

  // Perform input validation and sanitization for authContext if necessary

  return authContext;
}
