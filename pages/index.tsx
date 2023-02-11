import Head from "next/head";
import { getAllPosts } from "../lib/api";
import Post from "../types/post";
import TypewriterComponent from "typewriter-effect";
import { PostCard } from "../components/PostCard";
import { GetStaticProps } from "next";
import Image from "next/image";
import portrait from "../public/img/portrait.webp";

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  const morePosts = allPosts.slice(0, 5);
  return (
    <>
      <Head>
        <title>Lenny Angst</title>
      </Head>

      <section className="flex justify-center items-center p-5 flex-col-reverse gap-10">
        <div>
          <h1 className="text-4xl text-center sm:text-5xl md:text-7xl font-bold">
            <TypewriterComponent
              onInit={(typewriter) => {
                typewriter
                  .typeString("Lenny Angst")
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString("Lezurex")
                  .pauseFor(3000)
                  .deleteAll()
                  .start();
              }}
              options={{ loop: true }}
            />
          </h1>
          <p className="py-3 text-center">
            I am a software engineering apprentice from Zurich, Switzerland,
            <br />
            currently working at Migros-Genossenschafts-Bund.
          </p>
        </div>
        <Image
          src={portrait}
          alt="Portrait of me"
          className="rounded-full w-1/2 md:w-1/3 lg:w-1/4 hover:scale-105 transition ease-in-out duration-500 ring-red-500 ring-4"
        />
      </section>

      <section className="bg-gray-300 text-gray-900 flex flex-col items-center p-5">
        <h2 className="text-3xl">Recent Posts</h2>
        <div className="flex justify-center">
          {morePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
