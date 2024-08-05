
"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export const UseSetTheme = (theme: string) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [setTheme, theme]);
};
