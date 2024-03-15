import { useState } from "react";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { Loading } from "../components/Loading";

export const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className='flex justify-center h-screen w-screen'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='w-full md:w-[50%]'>
            <Auth type='signup' setLoading={setLoading} />
          </div>
          <div className='w-full hidden md:w-[50%] md:block'>
            <Quote />
          </div>
        </>
      )}
    </div>
  );
};
