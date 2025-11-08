import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import { ThemeProvider } from "@shared/providers";
import { AppLayout } from "@shared/layouts/AppLayout";
import { Header } from "@widgets/header";

export const metadata: Metadata = {
  title: "My App",
  description: "My App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" localStorageKey="mantine-color-scheme" />
      </head>
      <body>
        <ThemeProvider>
          <AppLayout header={<Header />}>
            {children}
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
