import "../Kw/navbat.css";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            Vote
          </a>
        </div>

        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <a href="/form">Form</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
          {/* </div>
        <div className="navbar-right"> */}
          <a href="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </a>
          <a href="/account" className="user-icon">
            <i className="fas fa-user"></i>
          </a>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
