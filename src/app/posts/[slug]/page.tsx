import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { getBlogBySlug, getBlogs } from '@service/lib/blogs';
import MarkdownViewer from '@components/markdownViewer';
import Utterances from '@components/utterances';
import MarkdownHeader from '@components/markdownHeader';

type Props = {
  params: {
    slug: string;
  };
};

const utterancesRepo = 'seolleung2/blog-nextjs';

// * 동적인 메타데이터 생성 generateMetadata
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const blog = await getBlogBySlug(slug);
  if (!blog) return;

  return {
    title: `Blog | ${blog.title}`,
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const blog = await getBlogBySlug(slug);
  if (!blog) redirect('/posts');

  return (
    <article>
      <MarkdownHeader blog={blog} />
      <MarkdownViewer content={blog.content} />
      <Utterances repo={utterancesRepo} path={blog.slug} />
    </article>
  );
}

export const generateStaticParams = async () => {
  const blogs = await getBlogs();
  return blogs.map(({ slug }) => ({
    slug,
  }));
};