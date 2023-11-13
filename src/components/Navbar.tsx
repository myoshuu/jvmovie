import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between">
        <div className="flex items-center gap-2 font-semibold text-2xl">
          <Icon icon="solar:clapperboard-bold" />
          <h1>
            <span className="text-blue">JV</span>Movie
          </h1>
        </div>
        <ul className="flex gap-x-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/genres">Genre</Link>
          </li>
          {/* <li>
            <Link
              className="px-8 py-2 bg-blue text-white rounded-md border hover:border-blue hover:bg-white hover:text-blue transition-all"
              to={""}
            >
              Login
            </Link>
          </li> */}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
