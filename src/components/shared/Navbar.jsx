import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

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
      .then((error) => console.log(error));
  };

  return (
    <div className="flex justify-between py-4 bg-green-300 items-center px-5">
      <div>
        <Link className="text-3xl font-bold" to="/">
          Logo
        </Link>
      </div>
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
      <div>
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
  );
};

export default Navbar;
