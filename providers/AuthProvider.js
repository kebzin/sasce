import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [additionalUserData, setAdditionalUserData] = useState();

  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }
  //     setSession(null);
  //     setUser(null);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle the error appropriately (e.g., show an error message to the user)
  //   }
  // }

  // // Function to get the user's session
  // async function getSessionData() {
  //   try {
  //     const { data, error } = await supabase.auth.getSession();
  //     if (error) {
  //       console.log(error);
  //       // Handle the error appropriately (e.g., show an error message to the user)
  //       return;
  //     }
  //     setSession(data.session);
  //   } catch (error) {
  //     console.log(error);
  //     // Handle the error appropriately (e.g., show an error message to the user)
  //   }
  // }

  // // featch users additional data and his profile images
  // // Function to fetch user's additional data and profile images
  // async function fetchAdditionalData() {
  //   try {
  //     if (user) {
  //       // Fetch additional data
  //       const { data, error } = await supabase
  //         .from("user")
  //         .select(
  //           "firstName, lastName, userName, phone, onboading, profileImage"
  //         )
  //         .eq("id", user.id)
  //         .single();

  //       console.log(error);
  //       if (error) {
  //         console.log(error);
  //         return;
  //       }
  //       setAdditionalUserData(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // Function to get the user's data
  // async function getUserData() {
  //   try {
  //     if (session) {
  //       const { data, error } = await supabase.auth.getUser();
  //       if (error) {
  //         console.error(error);
  //         // Handle the error appropriately (e.g., show an error message to the user)
  //         return;
  //       }
  //       setUser(data.user);
  //       fetchAdditionalData();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // Handle the error appropriately (e.g., show an error message to the user)
  //   }
  // }
  // useEffect(() => {
  //   const authListener = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       setSession(session);
  //       setUser(session?.user);
  //       if (event === "SIGNED_IN") {
  //         getUserData();
  //       } else if (event === "SIGNED_OUT") {
  //         setUser(null);
  //         setSession(null);
  //         setAdditionalUserData(null);
  //       }
  //     }
  //   );
  //   // return () => {
  //   //   if (authListener) {
  //   //     authListener.unsubscribe();
  //   //   }
  //   // };
  // }, []);
  // // Run the initial setup when the component mounts
  // useEffect(() => {
  //   if (!session) {
  //     getSessionData();
  //   }
  //   if (!user && session) {
  //     getUserData();
  //   }
  //   if (user && session) {
  //     fetchAdditionalData();
  //   }
  // }, [session, user]);
  // Provide the authentication context and its values to the child components
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
