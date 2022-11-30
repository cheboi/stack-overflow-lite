import { Outlet, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <nav className="nav">
          <ul className="nav-ul">
          <li className="nav-list">
              <button className="nav-button">
                <Link to="/signup">SignIn</Link>
              </button>
            </li>
             <li className="nav-list">
              <button className="nav-button">
                <Link to="/signin">SignIn</Link>
              </button>
            </li>
            <li className="nav-list">
            <button className="nav-button">
                <Link to="/askquestion">Ask</Link>
              </button>
            </li>
            <li className="nav-list">
            <button className="nav-button">
                <Link to="/">Home</Link>
              </button>
            </li>
          </ul>
        </nav>
        <Outlet />
      </header>
    </>
  );
};

export default Header;
