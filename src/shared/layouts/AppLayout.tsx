"use client";

import { AppShell } from "@mantine/core";

export function AppLayout({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        {header}
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

