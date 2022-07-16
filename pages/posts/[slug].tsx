import Head from "next/head";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { GetStaticPaths, GetStaticProps } from "next";
import { isArray } from "util";
import Image from "next/image";
import Post from "../../types/post";

type Props = {
  post: Post;
};

const PostPage = ({ post }: Props) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <section className="flex justify-center items-center p-5 flex-col gap-5">
        <h1 className="text-5xl font-bold">{post.title}</h1>
        <Image
          src={`/img/${post.coverImage}`}
          alt="cover"
          width={720}
          height={720}
        />
        <p className="w-1/3">{post.content}</p>
      </section>
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params?.slug === undefined || isArray(context.params?.slug))
    throw new Error("");
  const slug: string = context.params?.slug;
  const post = getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "content",
  ]);

  console.log(post);

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
