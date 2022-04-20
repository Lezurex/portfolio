import Page from "./page";

interface Post extends Page {
  slug: string;
  date: string;
  coverImage: string;
  excerpt: string;
}

export default Post;
