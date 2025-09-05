import fs from "fs"
import path from "path";
import matter from "gray-matter";
import {remark} from "remark"
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

import type {BlogItem} from "@/types";

const blogsDirectory = path.join(process.cwd(), "blogs");

export const getSortedBlogs = (): BlogItem[] => {
  const fileNames = fs.readdirSync(blogsDirectory)

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")

    const fullPath = path.join(blogsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf-8")

    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      summary: matterResult.data.summary,
      date: matterResult.data.date,
    }
  })

  // TODO sort by Date
  return allArticlesData;
}

export const getBlogContent = async (id: string) => {
  const filePath = path.join(blogsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  const {data, content} = matter(fileContents)

  const processed = await remark()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  return {
    id,
    htmlContent: processed.toString(),
    title: data.title as string,
    summary: data.summary as string,
    date: data.date as string,
  }
}
