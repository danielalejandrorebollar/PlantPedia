import { NavBar } from '@ui/NavBar'

export function Header() {
  const items = ["language"]
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div>{items}</div>
      </NavBar>
    </div>
  )
}
