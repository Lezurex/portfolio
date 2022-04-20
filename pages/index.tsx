import Head from "next/head";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { getAllPosts } from "../lib/api";
import Post from "../types/post";
import portraitImg from "../public/img/portrait.jpg";
import TypewriterComponent from "typewriter-effect";
import { PostCard } from "../components/PostCard";

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
        <div className="w-1/2 h-1/2 lg:w-1/3 lg:h-1/3">
          <Image
            className="rounded-full w-full h-full hover:scale-105 transition ease-in-out duration-500 ring-red-500 ring-4"
            src={portraitImg}
            alt="Portrait"
            layout="raw"
          ></Image>
        </div>
      </section>

      <section className="bg-gray-300 text-gray-900 flex flex-col items-center p-5">
        <h2 className="text-3xl">My Projects</h2>
        <PostCard post={heroPost} />
      </section>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
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
