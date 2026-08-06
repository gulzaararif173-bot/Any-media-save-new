"use client";

import * as React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      {children}
    </ThemeProvider>
  );
}