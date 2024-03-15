import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardType {
  id: string;
  title: string;
  content: string;
  authorName: string;
  postedTime: string;
}

export const BlogCard = ({
  id,
  title,
  content,
  authorName,
  postedTime,
}: BlogCardType) => {
  return (
    <div className='flex justify-center mx-auto rounded  border-b-2 flex-col w-3/5'>
      <Link className='mt-4  p-4' to={`/blog/${id}`}>
        <div>
          <div className='flex items-center gap-3 my-2'>
            <Avatar name={authorName} />
            <div>{authorName}</div>
            <span>•</span>
            <div>{postedTime}</div>
          </div>
          <div className='flex flex-col text-wrap'>
            <div className='font-bold text-xl'>{title}</div>
            <div className=''>{content.slice(0, 100) + "..."}</div>
            <div className='mt-4 text-slate-400'>
              {Math.ceil(content.split(/\s+/).length / 200)} minute(s) read
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
