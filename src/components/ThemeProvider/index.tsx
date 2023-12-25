/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";
import ThemeContext from "@/context/themeContext";
import { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeFromStorage: boolean =
    typeof localStorage !== "undefined" && localStorage.getItem("hotel-theme")
      ? JSON.parse(localStorage.getItem("hotel-theme")!)
      : false;

  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="text-[#1E1E1E] dark:bg-black dark:text-white">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
