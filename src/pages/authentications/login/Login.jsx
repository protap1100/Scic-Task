import image from "./../../../assets/Images/Sign-in.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SectionTitle from "../../../components/shared/SectionTitle";
import Google from "../../../components/login/Google";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Login Successful",
          text: "You have successfully logged in!",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        const message =
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
            ? "Wrong Password or Email. Please try again."
            : "Wrong Password or Email. Please try again.";
        setErrorMessage(message);
        toast.error(message);
      });
  };

  return (
    <>
      <SectionTitle
        heading={"Login Here"}
        subHeading={"Use Email And Password to Join"}
      />
      <section className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex-1">
          <img src={image} alt="Login" />
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#ce985a] focus:shadow-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <div>
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#ff6a45] focus:shadow-md"
                  required
                />
                <span
                  className="absolute animate__animated animate__fadeInDown inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="text-gray-800 text-2xl cursor-pointer" />
                  ) : (
                    <FaEyeSlash className="text-gray-800 text-2xl cursor-pointer" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>
            <label className="label">
              <a
                href="#"
                className="block text-base font-medium text-[#8484a1]"
              >
                Forgot password?
              </a>
            </label>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="px-2 py-1 w-full bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700  outline-none"
              >
                Login
              </button>
              <div className="mt-2">
                <Google />
              </div>
            </div>
          </form>
          <div className="text-center">
            Want to Join Us?
            <Link className="font-bold ml-2 text-orange-500" to="/register">
              Register
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
