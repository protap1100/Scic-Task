import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "/Logo.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Contact Information */}
          <div className="mb-8 md:mb-0 w-full md:w-1/3 grid place-items-center">
            <img className="w-20 h-8 my-4" src={logo} alt="" />
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="mb-2">
              Email:{" "}
              <a href="mailto:contact@example.com" className="hover:underline">
                protapb23@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:underline">
                +8801957290864
              </a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="w-full md:w-1/3 grid place-items-center">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-blue-600 hover:text-blue-800 transition"
                aria-label="Facebook"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://twitter.com"
                className="text-blue-400 hover:text-blue-600 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://instagram.com"
                className="text-pink-600 hover:text-pink-800 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-blue-700 hover:text-blue-900 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="mb-8 md:mb-0 w-full md:w-1/3 grid place-items-center">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:underline">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
