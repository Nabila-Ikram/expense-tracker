import React, { createContext, useState,useEffect } from 'react'
 export const DateContext= createContext()
const PreferencesProvider = ({children}) => {

    const [date, setDate] = useState(() => {
      return localStorage.getItem("DatePattern") || "YYYY-MM-DD";
    });
    useEffect(() => {
        localStorage.setItem("DatePattern", date);
      }, [date]);
  return (
    <div>
        <DateContext.Provider value={{date,setDate}}>
            {children}
        </DateContext.Provider>
      
    </div>
  )
}

export default PreferencesProvider
