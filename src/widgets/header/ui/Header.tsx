"use client";

import {
  Group,
  Text,
  Anchor,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { ThemeToggleButton } from "@features/theme-toggle";
import classes from "./HeaderMegaMenu.module.css";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box className={classes.header}>
      <Group justify="space-between" h="100%">
        <Group gap="lg">
          <Text fw={700}>My App</Text>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor component={Link} href="/" className={classes.link}>Главная</Anchor>
            <Anchor component={Link} href="/contacts" className={classes.link}>Контактная информация</Anchor>
          </Group>
        </Group>
        <Group>
          <ThemeToggleButton />
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </Group>

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Навигация" hiddenFrom="sm" zIndex={1000000}>
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          <Anchor component={Link} href="/" className={classes.link} onClick={closeDrawer}>Главная</Anchor>
          <Anchor component={Link} href="/contacts" className={classes.link} onClick={closeDrawer}>Контактная информация</Anchor>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}




