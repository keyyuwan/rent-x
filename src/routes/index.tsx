import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";
import { AppTabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
