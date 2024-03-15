export const CircleSkeleton = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className={`rounded-full bg-gray-300 h-9 w-9 flex justify-center`}>
        <div className='flex justify-center items-center text-xl text-white cursor-pointer'></div>
      </div>
    </div>
  );
};
