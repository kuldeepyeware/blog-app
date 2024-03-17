import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useUser } from "../hooks";

export const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  const clearToken = () => {
    const result = window.confirm("Are you sure to Logout?");
    if (result) {
      localStorage.removeItem("token");
      navigate("/signin");
    } else {
      return;
    }
  };

  return (
    <div className='flex justify-between h-14 px-6 items-center border border-b-1'>
      <div className='text-lg cursor-pointer'>
        <Link to={"/"}>Blog App</Link>
      </div>
      <div className='cursor-pointer flex gap-4 justify-center items-center'>
        <Link to={"/new"}>
          <button
            type='button'
            className='focus:outline-none rounded-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium  text-sm px-3 py-2  '>
            New Blog
          </button>
        </Link>
        <Avatar name={user?.name as string} clearToken={clearToken} />
      </div>
    </div>
  );
};
