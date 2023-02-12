import Page from "./page";

interface Project extends Page {
  slug: string;
  coverImage: string;
  repo: string;
}

export default Project;
