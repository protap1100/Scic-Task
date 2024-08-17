import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaBars } from "react-icons/fa";
import logo from "/Logo.png"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logout Successful",
          text: "You Have Successfully Logged Out",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => console.log(error));
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "bg-orange-400 text-white"
      : "text-white";
  };

  return (
    <div className="bg-green-300">
      <div className="flex justify-between items-center px-5 py-4">
        <div>
          <Link className="text-3xl font-bold" to="/">
           <img className="w-40 h-8 rounded" src={logo} alt="" />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <FaBars className="text-3xl text-orange-600" />
          </button>
        </div>

        {/* Navigation for Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`p-2 rounded hover:bg-orange-600 ${getActiveClass("/")}`}
          >
            Home
          </Link>
          <Link
            to="/product"
            className={`p-2 rounded hover:bg-orange-600 ${getActiveClass(
              "/product"
            )}`}
          >
            Product
          </Link>
          <Link
            to="/contact-us"
            className={`p-2 rounded hover:bg-orange-600 ${getActiveClass(
              "/contact-us"
            )}`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 bg-orange-600 hover:bg-orange-800 rounded text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="p-2 bg-orange-600 hover:bg-orange-800 rounded text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div
        className={`md:hidden flex flex-col items-center space-y-3 pb-4 transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-20"
        } overflow-hidden`}
      >
        <Link
          to="/"
          className={`p-2 rounded hover:bg-orange-600 ${getActiveClass("/")}`}
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
          to="/product"
          className={`p-2 rounded hover:bg-orange-600 ${getActiveClass(
            "/product"
          )}`}
          onClick={toggleMenu}
        >
          Product
        </Link>
        <Link
          to="/contact-us"
          className={`p-2 rounded hover:bg-orange-600 ${getActiveClass(
            "/contact-us"
          )}`}
          onClick={toggleMenu}
        >
          Contact
        </Link>

        {user ? (
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="p-2 bg-orange-600 hover:bg-orange-800 rounded text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="p-2 bg-orange-600 hover:bg-orange-800 rounded text-white"
            onClick={toggleMenu}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
