import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "@/components/common";
import { FaArrowRight } from "react-icons/fa6";
import { ARTICLES_DATA } from "@/data/articles";

// Drop letter animation component
const DropLetter = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: -50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.span>
  );
};

// Animated text component that splits text and applies drop animation
const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split("").map((letter, letterIndex) => (
            <DropLetter
              key={letterIndex}
              delay={delay + wordIndex * 0.1 + letterIndex * 0.05}
            >
              {letter}
            </DropLetter>
          ))}
        </span>
      ))}
    </div>
  );
};

export default function NewsAndArticles() {
  const [mainArticle, ...sideArticles] = useMemo(() => ARTICLES_DATA, []);

  return (
    <section className="py-16" id="news-and-articles">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary">
            <AnimatedText text="Our Latest News & Articles" delay={0.2} />
          </h2>
          <p className="mt-4 text-sm text-black">
            Stay updated with our latest news and articles, showcasing
            innovations and tips in the courier industry.
          </p>
        </motion.header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Article */}
          <motion.div className="md:w-1/2">
            <motion.img
              src={mainArticle.icon}
              alt={mainArticle.title}
              className="w-full rounded-md h-64 object-cover"
            />
            <div className="py-4">
              <span className="text-sm text-gray-500">{mainArticle.date}</span>
              <h3 className="text-2xl font-semibold mt-2 mb-4 text-gray-800">
                {mainArticle.title}
              </h3>
              <p className="text-md text-black mb-6">{mainArticle.excerpt}</p>
              <a href={`/blog/${mainArticle.slug}`}>
                <Button variant="link" icon={<FaArrowRight />}>
                  Read more
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Side Articles */}
          <motion.div className="md:w-1/2 flex flex-col gap-6">
            {sideArticles.map((article, index) => (
              <motion.div key={article.slug}>
                <Card className="!p-0 !bg-white !max-w-none !w-full !border-b-2 !flex-row !items-stretch !min-h-0 !rounded-md hover:!shadow-none">
                  <div className="w-1/4">
                    <motion.img
                      src={article.icon}
                      alt={`Illustration for ${article.title}`}
                      className="w-full 2xl:w-[146px] 2xl:h-[156px] md:h-[6rem] rounded-l-md object-cover"
                      loading="lazy"
                      width={146}
                      height={156}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                    />
                  </div>
                  <div className="px-4 py-1 flex flex-col justify-between items-start w-3/4">
                    <div>
                      <span className="text-xs 2xl:text-[20px] text-gray-500">
                        {article.date}
                      </span>
                      <h3 className="text-md 2xl:text-[24px] font-semibold mt-1 mb-2 text-gray-800 line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                    <a href={`/blog/${article.slug}`}>
                      <Button
                        variant="link"
                        icon={<FaArrowRight />}
                        className="!justify-start"
                      >
                        Read more
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
