import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/product"> Product </Link>
          </li>
          <li>
            <Link to="/contact-us"> Contact </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
