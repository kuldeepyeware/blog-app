import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { useBlog } from "../hooks";

type BlogCreateEdit = {
  type: "edit" | "new";
};

export const BlogCreateEdit = ({ type }: BlogCreateEdit) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const { blog } = useBlog(id as string);

  useEffect(() => {
    if (type === "edit" && blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [type, blog]);

  const publishBlog = async () => {
    setLoading(true);
    const response = await axios.post(
      `${BACKEND_URL}api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setTitle("");
    setContent("");
    setLoading(false);
    navigate(`/blog/${response.data.id}`);
  };

  const editBlog = async () => {
    setLoading(true);
    const response = await axios.put(
      `${BACKEND_URL}api/v1/blog`,
      {
        id,
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setTitle("");
    setContent("");
    setLoading(false);
    navigate(`/blog/${response.data.id}`);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center w-full pt-8 px-4'>
        <div className=' max-w-screen-lg  w-full flex flex-col justify-center items-center gap-5'>
          <input
            defaultValue={type == "edit" ? blog?.title : ""}
            type='text'
            className='border w-full border-gray-300 text-black text-lg  outline-none p-3 rounded-lg '
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            cols={30}
            rows={18}
            defaultValue={type == "edit" ? blog?.content : ""}
            placeholder='Write an Blog'
            onChange={(e) => setContent(e.target.value)}
            className='border w-full border-gray-300 text-black text-lg outline-none  p-3 rounded-lg '></textarea>
          <button
            type='button'
            onClick={type == "edit" ? editBlog : publishBlog}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none '>
            {type == "new" ? "Publish" : "Add Changes"}
          </button>
        </div>
      </div>
    </>
  );
};
