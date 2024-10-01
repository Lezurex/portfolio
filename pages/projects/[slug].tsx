import Head from "next/head";
import { getAllProjects, getProject } from "../../lib/api";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import Project from "../../types/project";

type Props = {
  project: Project;
};

const ProjectPage = ({ project: project }: Props) => {
  return (
    <>
      <Head>
        <title>{project.title}</title>
      </Head>

      <section className="flex justify-center items-center p-5 flex-col gap-5">
        <Image
          src={`/img/${project.coverImage}`}
          alt="cover"
          width={500}
          height={500}
        />
        <h1 className="text-5xl font-bold">{project.title}</h1>
        <div
          className="md:w-2/3 xl:w-1/3 prose prose-lg prose-invert"
          dangerouslySetInnerHTML={{ __html: project.content }}
        ></div>
      </section>
    </>
  );
};

export default ProjectPage;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params?.slug === undefined || Array.isArray(context.params?.slug))
    throw new Error("");
  const slug: string = context.params?.slug;
  const project = getProject(slug);

  const content = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(project.content);

  project.content = content.value.toString();

  return {
    props: { project },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllProjects(["title", "slug", "coverImage", "repo"]);

  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
