import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/superbase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
        return;
      }
      setSession(null);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  }

  // Function to get the user's session
  async function getSessionData() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
        // Handle the error appropriately (e.g., show an error message to the user)
        return;
      }
      setSession(data.session);
    } catch (error) {
      console.log(error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  }

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (event === "SIGNED_IN") {
          setSession(session);
        } else if (event === "SIGNED_OUT") {
          setSession(null);
        }
      }
    );
    // return () => {
    //   authListener.unsubscribe();
    // };
  }, []);

  // Run the initial setup when the component mounts
  useEffect(() => {
    if (!session) {
      getSessionData();
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
