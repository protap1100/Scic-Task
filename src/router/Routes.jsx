import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/errorpage/ErrorPage";
import Home from "../pages/home/Home";
import Product from "../pages/product/Product";
import ContactUs from "../pages/contactUs/ContactUs";
import Login from "../pages/authentications/login/Login";
import SignUp from "../pages/authentications/signup/SignUp";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <Home></Home>
          </PrivateRouter>
        ),
      },
      {
        path: "/product",
        element: (
          <PrivateRouter>
            <Product></Product>
          </PrivateRouter>
        ),
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
