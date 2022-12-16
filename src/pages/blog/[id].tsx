import dayjs from "dayjs";
import "dayjs/locale/ja";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { getDebugger } from "src/components/utils/Debugger";
import { client } from "src/libs/client";
import { Blog } from "src/types/blog";

const debug = getDebugger(true);

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  debug("BlogId is rendering");
  debug(props);

  const router = useRouter();
  const backToPreviousPage = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="mt-5 px-5 sm:mx-auto sm:w-150">
      <h2 className="text-3xl font-bold">{props.title}</h2>
      <time dateTime={props.publishedAt} className="mt-2 block text-xs text-gray-500">
        {dayjs(props.publishedAt).locale("ja").format("YYYY年MM月DD日(ddd) HH時mm分")}
      </time>
      <article className="prose-md prose my-8" dangerouslySetInnerHTML={{ __html: props.body }} />

      <ul className="flex items-center gap-x-1 text-sm">
        {props.tags.map((tag) => {
          return (
            <li className="rounded-full bg-slate-200 px-2" key={tag.id}>
              #{tag.tag}
            </li>
          );
        })}
      </ul>
      <Link href={"/"}>
        <a>
          <button
            onClick={backToPreviousPage}
            className="my-5 rounded-xl bg-red-600 px-4 py-3  text-sm text-white duration-500 hover:bg-slate-900"
          >
            戻る
          </button>
        </a>
      </Link>
    </div>
  );
};
export default BlogId;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const ids = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (ctx) => {
  if (!ctx.params) {
    return { notFound: true };
  }
  const data = await client.getListDetail<Blog>({ endpoint: "blog", contentId: ctx.params.id });
  return { props: data };
};
