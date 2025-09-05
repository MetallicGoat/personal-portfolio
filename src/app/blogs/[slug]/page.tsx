import { getBlogContent } from "@/lib/blogs"
import Link from "next/link"
import { FiArrowLeft, FiCalendar } from "react-icons/fi"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Blog({ params }: Props) {
  const { slug } = await params
  const blogData = await getBlogContent(slug)

  return (
    <section className="mx-auto w-11/12 md:w-5/6 max-w-6xl mt-10 flex flex-col gap-8">
      {/* Back to Blogs */}
      <div>
        <Link
          href="/blogs"
          className="
            inline-flex items-center gap-2 rounded-xl
            bg-green-100 dark:bg-green-950
            text-green-700 dark:text-green-300
            hover:bg-green-200 dark:hover:bg-green-900
            px-4 py-2 mb-2 font-medium transition
            w-fit
          "
          aria-label="Back to Blogs"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Blogs
        </Link>
      </div>

      {/* Blog Header */}
      <header className="flex items-center gap-4 mb-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 flex-1">
          {blogData.title}
        </h1>
        <div className="flex items-center text-gray-400 dark:text-gray-400 text-sm">
          <FiCalendar className="w-4 h-4 mr-1" />
          {blogData.date}
        </div>
      </header>

      {/* Article Styles (article prose is handled in global CSS) */}
      <article
        className="article prose prose-neutral dark:prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blogData.htmlContent }}
      />
    </section>
  )
}
