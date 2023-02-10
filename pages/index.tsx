import Head from "next/head";
import { getAllPosts } from "../lib/api";
import Post from "../types/post";
import TypewriterComponent from "typewriter-effect";
import { PostCard } from "../components/PostCard";
import { GetStaticProps } from "next";

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

      <section className="flex justify-center items-center p-5 flex-col-reverse md:flex-row gap-5 md:gap-20">
        <div>
          <h1 className="text-4xl text-center md:text-left sm:text-5xl md:text-7xl font-bold lg:min-w-[14ch] lg:max-w-[14ch]">
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
          <p className="py-3 text-center md:text-left">
            I am a software engineering apprentice from Zurich, Switzerland,
            <br />
            currently working at Migros-Genossenschafts-Bund.
          </p>
        </div>
        <div className="w-1/2 h-1/2 lg:w-1/3 lg:h-1/3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-full w-full h-full hover:scale-105 transition ease-in-out duration-500 ring-red-500 ring-4"
            src="/img/portrait.webp"
            alt="Portrait"
          />
        </div>
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
