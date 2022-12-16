import dayjs from "dayjs";
import "dayjs/locale/ja";
import { MicroCMSContentId, MicroCMSDate, MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, useCallback, useState } from "react";
import { getDebugger } from "src/components/utils/Debugger";
import { client } from "src/libs/client";
import { Blog, Tag } from "src/types/blog";

import { BsTag } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";

type Props = { blogs: MicroCMSListResponse<Blog>; tags: MicroCMSListResponse<Tag> };

const debug = getDebugger(true);

const Home: NextPage<Props> = (props) => {
  debug("Home is rendering");

  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const q = event.currentTarget.query.value;
    const data = await fetch("api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSearch(json);
    debug(json);
  };

  const handleReset: ComponentProps<"button">["onClick"] = useCallback(() => {
    setSearch(undefined);
  }, []);

  const contents = search ? search.contents : props.blogs.contents;
  const totalCount = search ? search.totalCount : props.blogs.totalCount;

  return (
    <main className="container mx-auto mt-8 max-w-5xl">
      <form className="flex justify-center gap-x-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          className="rounded border border-black px-2 py-px dark:border-slate-500 dark:bg-slate-400"
        />
        <button className="text-md rounded border border-black px-2 dark:border-slate-500">検索</button>
        <button
          type="reset"
          className="text-md rounded border border-black px-2 dark:border-slate-500"
          onClick={handleReset}
        >
          リセット
        </button>
      </form>
      <p className="mt-4 ml-5 text-gray-400">{`${search ? "検索結果" : "記事の総数"}: ${totalCount}件`}</p>
      <div className="mx-5 mt-4 flex flex-col justify-between sm:flex-row">
        <ul className="w-full">
          {contents.map((content) => {
            return (
              <li className="sm:r-5 mb-5 mr-0 flex flex-col border-b sm:mr-5" key={content.id}>
                <h2 className="text-2xl font-bold">{content.title}</h2>
                <time dateTime={content.publishedAt} className="mt-2 flex items-center text-xs text-gray-500">
                  <BiTimeFive />
                  {dayjs(content.publishedAt).locale("ja").format("YYYY.MM.DD")}
                </time>
                <ul className="mt-4 flex items-center gap-x-3 text-sm">
                  {content.tags.map((tag) => {
                    return (
                      <li className="flex items-center rounded-full bg-slate-200 px-2 dark:bg-slate-700" key={tag.id}>
                        <BsTag />
                        {tag.tag}
                      </li>
                    );
                  })}
                </ul>
                <Link href={`/blog/${content.id}`}>
                  <a className="w-fit">
                    <button className="mt-3 mb-5 rounded-xl bg-red-600 px-4 py-3 text-sm text-white duration-500 hover:bg-slate-900">
                      READ MORE {">>"}
                    </button>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mb-5">
          <h3 className="text-md mb-3 block w-full bg-red-600 px-3 py-1 font-bold text-white sm:w-60">#Tags</h3>
          <ul className="ml-1 flex flex-col gap-y-1">
            {[...props.tags.contents].reverse().map((tag) => {
              return (
                <li key={tag.id} className="flex items-center border-b pb-2">
                  <BsTag />
                  {tag.tag}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await client.getList({ endpoint: "blog" });
  const tags = await client.getList({ endpoint: "tag" });

  return { props: { blogs, tags } };
};

export default Home;
