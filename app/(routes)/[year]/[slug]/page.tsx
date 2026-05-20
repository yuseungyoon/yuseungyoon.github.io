import { Hydrate } from "app/(routes)/[year]/[slug]/(client)/Hydrate";
import logo from "assets/logo.svg";
import siteMeta from "assets/meta";
import { Spacing } from "components/base/Spacing";
import { Section } from "components/layout/Section";
import { RenderNotion } from "features/notion/containers/_RenderNotion";
import { getPostBySlug, getPostIndex } from "features/notion/remote/r2Fetch.server";
import { Top } from "features/post/containers/Top";
import { TableOfContentsContainer } from "features/tableOfContents";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ENV } from "static/env";
import * as pageStyles from "./page.css";

export const dynamicParams = false;

export interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPostIndex();
  return posts.map((post) => ({
    year: post.date.slice(0, 4),
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} – ${siteMeta.title}`;
  const description = post.summary;
  const keywords = post.tags.map((t) => t.name);

  return {
    title,
    description,
    keywords: keywords,
    authors: { name: siteMeta.author, url: ENV.NEXT_PUBLIC_ROOT },
    openGraph: {
      title,
      description,
      images: { url: logo.src },
      tags: keywords,
    },
  };
}

export default async function Post({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { content, ...meta } = post;

  return (
    <>
      <Hydrate state={{ currentPost: content }} />

      <Top meta={meta} />

      <div className={pageStyles.contentLayout}>
        <Section>
          <Suspense fallback={<>...</>}>
            <RenderNotion blocks={content} />
            <Spacing size={12} />
          </Suspense>
        </Section>
        <TableOfContentsContainer />
      </div>
      <Spacing size={48} />
    </>
  );
}
