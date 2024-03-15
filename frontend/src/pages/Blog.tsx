import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Navbar } from "../components/Navbar";
import { useBlog } from "../hooks";
import { BlogDetailSkeleton } from "../components/BlogDetailSkeleton";
import { formatDate } from "../lib";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom/atom";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { Loading } from "../components/Loading";
import { useState } from "react";

export const Blog = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { id } = useParams();
  const { loading, blog } = useBlog(id as string);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const deleteBlog = async () => {
    const result = window.confirm("Are you sure to delete blog?");
    if (result) {
      setDeleteLoading(true);
      await axios.delete(`${BACKEND_URL}api/v1/blog/delete`, {
        data: {
          authorId: user?.id,
          postId: blog?.id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDeleteLoading(false);
      navigate("/");
    } else {
      return;
    }
  };

  if (deleteLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <BlogDetailSkeleton />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-between mt-[50px] md:px-10'>
        <div className=' w-[80%] pl-[50px] md:pr-10'>
          <div className='flex justify-between items-center gap-4'>
            <h1 className='md:text-5xl text-3xl font-bold'>{blog?.title}</h1>
            <div className='flex gap-1 flex-col md:flex-row'>
              {blog?.authorId == user?.id && (
                <Link to={`/edit/${blog?.id}`}>
                  <button
                    type='button'
                    className='focus:outline-none rounded-lg text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium  text-xs px-3 py-2  '>
                    Edit ✍🏻
                  </button>
                </Link>
              )}
              {blog?.authorId == user?.id && (
                <button
                  type='button'
                  onClick={deleteBlog}
                  className='focus:outline-none rounded-lg text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium  text-xs px-3 py-2  '>
                  Delete 🗑️
                </button>
              )}
            </div>
          </div>
          <p className='text-xl my-3 text-slate-400'>{`Posted on ${formatDate(
            blog?.postedTime as string
          )}`}</p>

          <div className=' text-wrap whitespace-pre-line'>{blog?.content}</div>
        </div>
        <div className='md:w-[20%] hidden md:block'>
          <h3 className='mb-5 text-xl font-semibold text-center'>Author</h3>
          <div className='flex flex-col md:flex-row items-center gap-2'>
            <div>
              <Avatar name={blog?.author.name as string} />
            </div>
            <h2 className='text-xl text-wrap'>{blog?.author.name as string}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
