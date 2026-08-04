import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { createContext } from 'react'
export const ThemeContext = createContext(); // creating
// place outside so dont create on every render

const ThemeProvider = ({children}) => {
const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "dark";
});
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    // 3. Provide it to all children
    <ThemeContext.Provider value={{theme,setTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
