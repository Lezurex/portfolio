import Post from "../types/post";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return <div className="rounded flex flex-col">{post.title}</div>;
};
