import { NavBar } from '@ui/NavBar'
import NavLink from 'next/link'

export function Header() {
  const items = ["language"]
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div>
        <NavLink href="/top-stories">Top Stories</NavLink>
        </div>
        <div>{items}</div>
      </NavBar>
    </div>
  )
}
