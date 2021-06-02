import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { NavBar } from '@ui/NavBar'
<<<<<<< HEAD
import NavLink from 'next/link'
=======
import { Button } from '@ui/Button'
>>>>>>> f4f38b7 (TopStories: Add index and author page)

export function Header() {
  const items = ["language"]
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div>
<<<<<<< HEAD
        <NavLink href="/top-stories">Top Stories</NavLink>
        </div>
        <div>{items}</div>
=======
          <NavLink href="/top-stories">Top Stories</NavLink>
        </div>
>>>>>>> f4f38b7 (TopStories: Add index and author page)
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
