import { BlogCard } from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";
import { formatDate } from "../lib";

export const Home = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className='flex justify-center flex-col w-screen'>
        <div>
          <Navbar />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {blogs?.map((blog) => (
        <BlogCard
          key={blog.id}
          authorName={blog.author.name || "Anonymous"}
          title={blog.title}
          postedTime={formatDate(blog.postedTime)}
          content={blog.content}
          id={blog.id}
        />
      ))}
    </>
  );
};
