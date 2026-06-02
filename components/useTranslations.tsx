import { useRouter } from 'next/router';
import React, {  createContext  } from 'react'
import allLocales from 'locales/allLabels.json'

export type Locale = keyof typeof allLocales;

type UserContextType = {
  locale: Locale ,
  labels: typeof allLocales[Locale]
};


export const LocaleContext = createContext<UserContextType>({
  locale: "es",
  labels: allLocales.es
  
});


export const LocaleProvider = ({children}: {children: React.ReactNode}) => {
  let { locale } = useRouter();
  
  const currentLocale: Locale = locale && locale in allLocales ? (locale as Locale) : "es"
  const labels = allLocales[currentLocale]
  

  return(
    <LocaleContext.Provider value= {{locale:currentLocale, labels}}>
      {children}
    </LocaleContext.Provider>
  )


}

