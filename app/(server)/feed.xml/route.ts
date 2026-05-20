import siteMeta from "assets/meta";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getPostIndex } from "features/notion/remote/r2Fetch.server";
import RSS from "rss";
import { ENV } from "static/env";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dynamic = "force-static";

export async function GET() {
  const feed = new RSS({
    title: siteMeta.title,
    description: siteMeta.description,
    site_url: `${ENV.NEXT_PUBLIC_ROOT}`,
    feed_url: `${ENV.NEXT_PUBLIC_ROOT}/feed.xml`,
    copyright: siteMeta.author,
    language: "ko",
    pubDate: dayjs().tz("Asia/Seoul").format("YYYY-MM-DD"),
  });
  try {
    const postList = await getPostIndex();
    postList.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.summary,
        url: `${ENV.NEXT_PUBLIC_ROOT}/${dayjs(post.date).year()}/${post.slug}`,
        date: post.date,
        author: siteMeta.author,
      });
    });

    return new Response(feed.xml(), {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    });
  } catch (err) {
    return new Response(`rss: internal server error \n ${err} \n`, { status: 500 });
  }
}
