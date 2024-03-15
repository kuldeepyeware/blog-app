export const BlogCardSkeleton = () => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='flex justify-center mx-auto rounded mt-9  border-b-2 flex-col w-2/5'>
        <div>
          <div className='flex items-center gap-3 my-2'>
            <div className='h-2.5 bg-gray-200 rounded-full  w-48 mb-4'></div>
          </div>
          <div className='flex flex-col text-wrap'>
            <div className='h-2.5 bg-gray-200 rounded-full  w-48 mb-4'></div>
            <div className='h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5'></div>
            <div className='mt-4 text-slate-400'>
              <div className='h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
