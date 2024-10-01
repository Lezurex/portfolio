import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "content", "posts");
const projectsDirectory = join(process.cwd(), "content", "projects");

export function getFileSlugs(dir: string) {
  return fs.readdirSync(dir);
}

export function getFileBySlug(
  slug: string,
  dir: string,
  fields: string[] = []
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(dir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getPost(slug: string) {
  return getFileBySlug(slug, postsDirectory, [
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "content",
  ]);
}

export function getProject(slug: string) {
  return getFileBySlug(slug, projectsDirectory, [
    "title",
    "slug",
    "coverImage",
    "repo",
    "content"
  ])
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getFileSlugs(postsDirectory);
  const posts = slugs
    .map((slug) => getFileBySlug(slug, postsDirectory, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllProjects(fields: string[] = []) {
  const slugs = getFileSlugs(projectsDirectory);
  const projects = slugs.map((slug) =>
    getFileBySlug(slug, projectsDirectory, fields)
  );
  return projects;
}
