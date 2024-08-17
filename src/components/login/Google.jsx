import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Google = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        navigate('/');
      })
      .then((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="p-2 bg-blue-200 rounded-xl hover:bg-blue-400 hover:text-white flex gap-10 justify-center items-center w-full btn-info"
        >
          <FaGoogle></FaGoogle>
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default Google;
