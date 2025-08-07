import React from "react";
import { Button } from "@/components/common";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogTemplate = ({ article }) => {
  const navigate = useNavigate();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Button
        variant="link"
        icon={<FaArrowLeft />}
        onClick={() => navigate(-1)}
        className="mb-8 !text-primary hover:!text-primary-dark"
      >
        Back to News
      </Button>

      <header className="mb-8">
        <span className="text-sm text-gray-500">{article.date}</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-800">
          {article.title}
        </h1>
        <div className="w-full h-px bg-gray-200 my-4"></div>
      </header>

      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
        <img
          src={article.icon}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogTemplate;
