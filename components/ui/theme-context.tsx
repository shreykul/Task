import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode; // what user selected
  theme: "light" | "dark"; // actual applied theme
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // update when system or mode changes
  useEffect(() => {
    const applyTheme = () => {
      if (mode === "system") {
        const systemScheme = Appearance.getColorScheme();
        setTheme(systemScheme === "dark" ? "dark" : "light");
      } else {
        setTheme(mode);
      }
    };

    applyTheme();

    const sub = Appearance.addChangeListener(applyTheme);
    return () => sub.remove();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeCustom = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeCustom must be used inside ThemeProviderCustom");
  return ctx;
};
