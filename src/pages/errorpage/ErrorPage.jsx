import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      Routes Not Found
      <Link to={"/"} className="p-2">
        Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
