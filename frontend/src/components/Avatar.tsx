import { CircleSkeleton } from "./CircleSkeleton";

interface AvatarType {
  name: string;
  clearToken?: () => void;
}

export const Avatar = ({ name, clearToken }: AvatarType) => {
  if (!name) {
    return <CircleSkeleton />;
  }
  return (
    <div
      className={
        "rounded-full bg-gray-600 h-9 w-9 md:h-9 md:w-9 flex justify-center"
      }>
      <div
        className='flex justify-center items-center text-xl text-white cursor-pointer'
        onClick={clearToken}>
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};
