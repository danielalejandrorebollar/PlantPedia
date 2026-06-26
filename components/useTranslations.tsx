import { useRouter } from 'next/router';
import React, {  createContext  } from 'react'
// import allLocales from 'locales/allLabels.json'
import localeEs from 'src/locales/es/common.json'
import localeUs from 'src/locales/en-US/common.json'

// export type Locale = keyof typeof allLocales;
export type LocaleEs = keyof typeof localeEs;
export type LocaleUs = keyof typeof localeUs;


// type UserContextType = {
//   locale: Locale ,
//   labels: typeof allLocales[Locale]
// };
type UserContextType = {
  locale: Locale,
  labels: typeof localeUs | typeof localeEs
};

const allLocales = {
  'es': localeEs,
  'en-US': localeUs,
};


export type Locale = keyof typeof allLocales;

export const LocaleContext = createContext<UserContextType>({
  locale: "es",
  labels: localeEs
  
});


export const LocaleProvider = ({children}: {children: React.ReactNode}) => {

  let { locale } = useRouter();

  const currentLocale: Locale = locale && locale in allLocales
        ? (locale as Locale)
        : 'es';

  const labels = allLocales[currentLocale];


  return(
    <LocaleContext.Provider value= {{ locale: currentLocale, labels}}>
      {children}
    </LocaleContext.Provider>
  )


}

