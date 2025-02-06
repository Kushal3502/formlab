import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./components/theme-provider";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Provider;
