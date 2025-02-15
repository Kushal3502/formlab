import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme-provider";
import { FormProvider } from "./context/formContext";
import { FieldsProvider } from "./context/fieldContext";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <FormProvider>
      <FieldsProvider>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </FieldsProvider>
    </FormProvider>
  );
}

export default Provider;
