import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItem}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">BreakpointArt Recipe</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn bg-green-600 text-white rounded p-2 hover:bg-green-400 hover:text-white">
          Login
        </a>
      </div>
    </div>
  );
};

// active color styling for nav link 
const activeLinkStyle = ({ isActive, isPending }) =>
  isPending
    ? "pending"
    : isActive
    ? "bg-green-600 text-white rounded p-2"
    : " hover:bg-green-400 hover:text-white rounded p-2";

const navItem = (
  <>
    <NavLink to={"/"} className={activeLinkStyle}>
      Home
    </NavLink>
    <NavLink to={"/all-recipe"} className={activeLinkStyle}>
      All Recipe
    </NavLink>
    <NavLink to={"/add-recipe"} className={activeLinkStyle}>
      Add Recipe
    </NavLink>
  </>
);

export default Navbar;
