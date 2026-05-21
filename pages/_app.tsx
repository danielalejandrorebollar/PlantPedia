import { AppProps } from 'next/app'
import { useServerStyles } from '@ui/ssr'
import { UIProvider } from '@ui/Provider'

import '../ui/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()
  const Router = useRouter()
useEffect(()=>{

  const favicon=
      document.querySelector(
        "link[rel='icon']"
      ) as HTMLLinkElement

  const start=()=>{
      favicon.href="/favicon.ico"
      document.title="Cargando..."
  }

  const end=()=>{
      favicon.href="/leaf.png"
      document.title="Plantpedia"
  }

  Router.events.on(
      "routeChangeStart",
      start
  )

  Router.events.on(
      "routeChangeComplete",
      end
  )

  Router.events.on(
      "routeChangeError",
      end
  )

  return ()=>{

      Router.events.off(
        "routeChangeStart",
        start
      )

      Router.events.off(
        "routeChangeComplete",
        end
      )

      Router.events.off(
        "routeChangeError",
        end
      )
  }

},[])
  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  )
}

export default NextApp
