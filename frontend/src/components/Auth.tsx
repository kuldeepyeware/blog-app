import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import { Button } from "./Button";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constant";

interface Type {
  type: "signup" | "signin";
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Auth = ({ type, setLoading }: Type) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}api/v1/user/signup`, {
        email,
        password,
        name,
      });
      localStorage.setItem("token", response.data.jwt);
      setEmail("");
      setName("");
      setPassword("");
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const loginAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}api/v1/user/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.jwt);
      setEmail("");
      setName("");
      setPassword("");
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center '>
      <div>
        {type == "signup" ? (
          <div>
            <div className='text-3xl font-bold text-center'>
              Create an Account
            </div>
            <div className='text-center text-slate-500'>
              Already have an account?{" "}
              <Link to={"/signin"} className='underline'>
                Login
              </Link>
            </div>
            <LabelledInput
              label='Name'
              placeholder='Enter your name'
              type='text'
              onchange={(e) => setName(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <div className='text-3xl font-bold text-center'>
              Login into Account
            </div>
            <div className='text-center text-slate-500'>
              Don't have an account?{" "}
              <Link to={"/signup"} className='underline'>
                Signup
              </Link>
            </div>
          </div>
        )}
        <LabelledInput
          label='Email'
          type='email'
          placeholder='me@gmail.com'
          onchange={(e) => setEmail(e.target.value)}
        />
        <LabelledInput
          label='Password'
          type='password'
          placeholder=''
          onchange={(e) => setPassword(e.target.value)}
        />
        {type == "signup" ? (
          <Button onclick={createAccount} label='Sign Up' />
        ) : (
          <Button onclick={loginAccount} label='Login' />
        )}
      </div>
    </div>
  );
};
