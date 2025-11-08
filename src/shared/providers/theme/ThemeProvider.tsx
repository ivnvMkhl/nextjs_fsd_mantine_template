"use client";

import { MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import "@mantine/core/styles.css";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorSchemeManager = localStorageColorSchemeManager({ key: "mantine-color-scheme" });
  return (
    <MantineProvider defaultColorScheme="auto" colorSchemeManager={colorSchemeManager}>
      {children}
    </MantineProvider>
  );
}


