/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constant";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../atom/atom";

interface Blogs {
  title: string;
  content: string;
  id: string;
  postedTime: string;
  authorId: string;
  author: {
    name: string;
  };
}

type id = string;

interface UserGlobal {
  id: string;
  name: string;
  email: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    blogs,
    loading,
  };
};

export const useBlog = (id: id) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blogs>();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog(response.data.post);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    blog,
    loading,
  };
};

export const useUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useRecoilState<UserGlobal | null>(userAtom);

  const fetchData = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        token = "";
      }
      const response = await axios.get(`${BACKEND_URL}api/v1/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    user,
    loading,
  };
};
