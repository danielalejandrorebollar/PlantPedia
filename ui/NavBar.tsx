import { useState, useEffect } from 'react'
import Head from 'next/head'
import { AppBar, Button, Menu, MenuItem, Toolbar } from '@material-ui/core'

import { Typography } from './Typography'
import { useRouter } from 'next/router'
// import { language } from '@api/index'
import { useTranslation } from 'next-i18next'

type Props = {
  title: string
  children: React.ReactNode
}

export function NavBar({ title, children }: Props) {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>()
  const [menu, setMenu] = useState<boolean>(false)
  const {locale, locales} = useRouter()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  
  let lang
  if(locale == "es"){
    lang = "ES"
  } else if(locale == "en-US"){
    lang = "US"
  }

  const toggleLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setMenu(true)
    };
    
    const setCookie = async (nuevoIdioma:string) => {

      setMenu(false)
      setAnchorEl(null)
      console.log("nuevoidionma",nuevoIdioma)

      try {
        const response =  await  fetch("/api/change-language",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
          },
          body: JSON.stringify({ locale: nuevoIdioma }),
        });
        if (response.ok) {
        // 2. En Next.js 10, para que el cambio de idioma surta efecto visual,
        // usamos el router cambiando el locale actual.
        router.push("/", router.asPath, { locale: nuevoIdioma});
      }
      } catch (error) {
        console.log(error)
      }

      

    }
      
    // console.log(t('menuLanguage'))
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="border-b-2 border-t-2 border-grey-200"
    >
      <Toolbar>
        <PlantpediaNoLoVeniasVenirLogo title={title} />
        {children}
        <Typography variant="h6" style={{fontSize:'14px'}}  component="h6">
          {t('language')}
        </Typography>
        <Typography variant="h6"  component="h6">
        <Button 
          onClick={toggleLanguage}
        >
          {lang}
        </Button>
        <Menu anchorEl={anchorEl} open={menu}>
          {
            locales?.map(loc=>(
              <MenuItem onClick={()=>setCookie(loc)} key={loc}>{loc}</MenuItem>
            ))
          }
        </Menu>
      </Typography>
        
      </Toolbar>
    </AppBar>
  )
}

const faviconsBeios = [
  '🌿',
  '🍃',
  '🍀',
  '🌷',
  '🌸',
  '🌚',
  '🌲',
  '🌵',
  '🌾',
  '🌱',
  '🌝',
  '🌴',
]
const faviconOptionsLength = faviconsBeios.length

function PlantpediaNoLoVeniasVenirLogo({ title }: { title: string }) {
  const [faviconIndex, setFaviconIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const toggleCraziness = () => setIsHovering(!isHovering)

  useEffect(() => {
    if (!isHovering) return

    const intervalId = setInterval(() => {
      setFaviconIndex((previousValue) => {
        const nextValue = previousValue + 1
        if (nextValue >= faviconOptionsLength) return 0
        return nextValue
      })
    }, 150)

    return () => {
      clearTimeout(intervalId)
    }
  }, [isHovering])

  const favicon = faviconsBeios[faviconIndex]

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${favicon}</text></svg>`}
          
        ></link>
      </Head>
      <Typography variant="h4" className="flex-grow" component="h1">
        <a
          href="/"
          onMouseEnter={toggleCraziness}
          onMouseLeave={toggleCraziness}
        >
          {title}
        </a>
      </Typography>
    </>
  )
}
