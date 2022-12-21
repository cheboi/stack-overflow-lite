import { useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetDetailsQuery } from "../../features/api/authAPI";
import { logout, setCredentials } from "../../features/authSlice";
import "./Header.css";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <>
      <header>
        <nav className="nav">
          <ul className="nav-ul">
            <div style={{ marginLeft: "30px" }}>
              <li className="nav-list">
                <button className="nav-button">
                  <Link to="/profile">Profile</Link>
                </button>
              </li>
            </div>
            <div style={{ marginLeft: "30px" }}>
              <li className="nav-list">
                {userInfo ? (
                  <button className="nav-button" onClick={() => dispatch(logout())}>
                    Logout
                  </button>
                ) : (
                  <Link className="nav-button" to="/signin">
                    Login
                  </Link>
                )}
              </li>
            </div>

            <li className="nav-list">
              <button className="nav-button">
                <Link to="/signup">Sign up</Link>
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
