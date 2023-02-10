import Link from "next/link";
import Post from "../types/post";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <Link
      className="relative flex items-center justify-center m-3 overflow-hidden shadow-xl w-60 h-60 rounded-2xl group cursor-pointer"
      href={`/posts/${post.slug}`}
    >
      <div
        className="absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover group-hover:scale-125"
        style={{ backgroundImage: `url('/img/${post.coverImage}')` }}
      ></div>
      <div className="flex flex-col bg-white bg-opacity-40 p-3 w-full absolute bottom-0 transition-all duration-500 ease-in-out transform scale-100 group-hover:scale-105">
        <b className="font-bold">{post.title}</b>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
};
