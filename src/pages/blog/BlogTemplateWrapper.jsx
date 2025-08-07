import { useParams } from "react-router-dom";
import { ARTICLES_DATA } from "@/data/articles";
import BlogTemplate from "@/components/BlogTemplate";

export default function BlogTemplateWrapper() {
  const { slug } = useParams();
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) return <div className="p-8">Article not found</div>;

  return <BlogTemplate article={article} />;
}
