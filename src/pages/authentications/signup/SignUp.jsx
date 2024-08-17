import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import regImage from "./../../../assets/Images/Sign-in.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SectionTitle from "../../../components/shared/SectionTitle";
import Google from "../../../components/login/Google";
import useAuth from "../../../Hooks/useAuth";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photoUrl } = data;
    console.log(name, email, photoUrl, password);

    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Password must contain at least one lowercase letter", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Password must contain at least one uppercase letter", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (password.length < 6) {
      toast.error("Password must be 6 characters or higher", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      createUser(email, password)
        .then((result) => {
          console.log(result.user, "user");
          updateUserProfile(name, photoUrl)
            .then(() => {
              toast.success("User registered successfully!");
              reset();
              navigate("/");
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <SectionTitle
        heading={"Register Here"}
        subHeading={"Fill Up The Form To Join Us"}
      ></SectionTitle>
      <div className="mt-10 flex flex-col lg:flex-row justify-center items-center">
        <div className="flex-1">
          <img className="rounded" src={regImage} alt="" />
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#ff8b48] focus:shadow-md"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#ff5a3d] focus:shadow-md"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Photo Url
              </label>
              <input
                type="text"
                name="photoUrl"
                id="photoUrl"
                placeholder="Photo Url"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                {...register("photoUrl")}
              />
            </div>
            <div>
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("password", {
                    required: "Password is required",
                  })}
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
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>
            <label className="label">
              <a  
                href="#"
                className="block text-base font-medium text-[#07074D]"
              >
                Forgot password?
              </a>
            </label>
            <div className="form-control mt-6">
              <div className="">
                <button
                  type="submit"
                  className="px-2 py-1 w-full bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700  outline-none"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-2">
                <Google></Google>
              </div>
            </div>
          </form>
          <div className="text-center">
            Already Have An Account?
            <Link className="font-bold ml-2 text-orange-500" to="/login">
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
