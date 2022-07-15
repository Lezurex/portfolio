import Head from "next/head";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { getAllPosts } from "../lib/api";
import Post from "../types/post";
import portraitImg from "../public/img/portrait.jpg";
import TypewriterComponent from "typewriter-effect";
import { PostCard } from "../components/PostCard";
import { GetStaticProps } from "next";

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
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
                  .typeString("Hey, I'm Lenny!")
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString("Software Engineer")
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString("from Zurich")
                  .pauseFor(3000)
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
        <div
          className="w-80 h-80 lg:w-96 lg:h-96 hover:scale-[1.03] transition ease-in-out duration-500 rounded-full ring-red-500 ring-4 bg-center bg-cover"
          style={{ backgroundImage: "url('/img/portrait.webp')" }}
        ></div>
      </section>

      <section className="bg-gray-300 text-gray-900 flex flex-col items-center p-5">
        <h2 className="text-3xl">My Projects</h2>
        <PostCard post={heroPost} />
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
