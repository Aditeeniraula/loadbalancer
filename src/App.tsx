import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export interface AuthContextInterface {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
