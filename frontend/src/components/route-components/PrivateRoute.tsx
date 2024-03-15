/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState } from "recoil";
import { authAtom } from "../../atom/atom";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constant";

type Props = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const [authAtomStatus, setAuthAtomStatus] = useRecoilState(authAtom);

  const fetchData = async () => {
    const response = await axios.get(`${BACKEND_URL}api/v1/user/auth`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") ? localStorage.getItem("token") : ""
        }`,
      },
    });
    setAuthAtomStatus(response.data.status);
  };

  useEffect(() => {
    fetchData();
    if (authAtomStatus === false) {
      navigate("/signin");
    }
  }, [authAtomStatus]);

  return children;
};
