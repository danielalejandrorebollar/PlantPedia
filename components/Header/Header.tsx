import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { NavBar } from '@ui/NavBar'


import { Button } from '@ui/Button'
import PreviewModeBanner from './PreviewModeBanner'


export function Header() {
  // const items = ["language"]
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div>
          <NavLink href="/top-stories">Top Stories</NavLink>
        </div>
        <PreviewModeBanner/>
      </NavBar>
    </div>
  )
}

function NavLink({ children, ...linkProps }: PropsWithChildren<LinkProps>) {
  return (
    <Link {...linkProps} passHref>
      <Button color="inherit" variant="text" component="a">
        {children}
      </Button>
    </Link>
  )
}
