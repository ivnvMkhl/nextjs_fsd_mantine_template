"use client";

import { ActionIcon, Tooltip, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./ThemeToggleButton.module.css";

export function ThemeToggleButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  const toggle = () => setColorScheme(computedColorScheme === "light" ? "dark" : "light");

  return (
    <Tooltip label={`Switch to ${computedColorScheme === "light" ? "dark" : "light"} mode`}>
      <ActionIcon variant="default" onClick={toggle} aria-label="Toggle color scheme">
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.75} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.75} />
      </ActionIcon>
    </Tooltip>
  );
}

