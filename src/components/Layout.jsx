import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <NavLink to="/" className="logo">
            <span className="logo-icon">📦</span>
            Product Manager
          </NavLink>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Products
            </NavLink>
            <NavLink to="/products/new" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Add Product
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="main container">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>Products REST API · React SPA</p>
        </div>
      </footer>
    </div>
  )
}
