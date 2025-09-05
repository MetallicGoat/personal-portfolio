import { getSortedBlogs } from "@/lib/blogs";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";

export default function Blogs() {
  const blogs = getSortedBlogs();

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight dark:text-white">
        My <span className="text-green-500">Blogs</span>
      </h1>

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${encodeURIComponent(blog.id)}`}
            key={blog.id}
            className="
              group block rounded-2xl
              bg-neutral-100 dark:bg-neutral-900
              shadow-lg hover:shadow-xl dark:shadow-neutral-900
              transition-all duration-300
              border border-neutral-200 dark:border-neutral-800
              p-6
            "
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="
                text-2xl font-semibold
                group-hover:text-green-500
                transition-colors
                text-neutral-900 dark:text-neutral-100
              ">
                {blog.title}
              </h2>
              <span className="flex items-center text-gray-400 dark:text-gray-400 text-lg">
                <FiCalendar className="w-4 h-4 mr-1" />
                {blog.date}
              </span>
            </div>
            {blog.summary && (
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                {blog.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
