import { useContext } from "react";

import { type Dispatch, type SetStateAction, createContext } from "react";

interface ThemeContextType {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  setDarkTheme: () => null,
});
export default ThemeContext;

export const useThemeContext = () => useContext(ThemeContext);
