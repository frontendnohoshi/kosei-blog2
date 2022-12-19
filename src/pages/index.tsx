import dayjs from "dayjs";
import "dayjs/locale/ja";
import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, memo, useState } from "react";
import { getDebugger } from "src/components/utils/Debugger";
import { client } from "src/libs/client";
import { Blog, Tag } from "src/types/blog";

import { BsTag } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

import ReactPaginate from "react-paginate";

type Props = { blogs: MicroCMSListResponse<Blog>; tags: MicroCMSListResponse<Tag> };

const debug = getDebugger(true);

const Home: NextPage<Props> = memo((props) => {
  debug("Home is rendering");

  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const q = event.currentTarget.query.value;
    setContentOffset(0);
    try {
      setIsSearchLoading(true);
      const data = await fetch("api/search", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ q }),
      });
      debug(data);
      const json: MicroCMSListResponse<Blog> = await data.json();
      setSearch(json);
      debug(json);
    } catch (error) {
      alert(error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleReset: ComponentProps<"button">["onClick"] = (event) => {
    setSearch(undefined);
    setContentOffset(0);
  };

  const contents = search ? search.contents : props.blogs.contents;
  const totalCount = search ? search.totalCount : props.blogs.totalCount;

  // ページネーション
  const contentsPerPage = 4;
  const [contentOffset, setContentOffset] = useState(0);
  const endOffset = contentOffset + contentsPerPage;
  const currentContents = contents.slice(contentOffset, endOffset);
  const pageCount = Math.ceil(totalCount / contentsPerPage);
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * contentsPerPage) % totalCount;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setContentOffset(newOffset);
  };

  return (
    <main className="container mx-auto my-8  flex max-w-5xl flex-col">
      <form className="mx-auto flex w-full flex-col sm:w-150 sm:flex-row sm:justify-between" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="サイト内検索"
          className="mx-5 mb-4 h-10 rounded-xl p-3 text-sm drop-shadow-[0px_5px_5px_rgba(0,0,0,0.3)] duration-500 focus:outline-none dark:bg-slate-600 dark:drop-shadow-[0px_5px_5px_rgba(255,255,255,0.5)] dark:placeholder:text-slate-100 sm:mx-0 sm:w-96"
        />
        <div className="mx-5 flex h-10 gap-x-3 sm:mx-0">
          <button className="flex w-6/12 items-center justify-center rounded-xl bg-red-600 pr-1.5 text-sm text-white drop-shadow-[0px_5px_5px_rgba(0,0,0,0.35)] duration-500 hover:bg-slate-900 dark:border-slate-500 dark:drop-shadow-[0px_5px_5px_rgba(255,255,255,0.5)] sm:w-24">
            <AiOutlineSearch />
            検索
          </button>
          <button
            type="reset"
            className="w-6/12 rounded-xl border border-red-100 bg-white text-sm text-red-600 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.3)] duration-500 hover:bg-red-50 dark:border-slate-500 dark:bg-slate-600 dark:drop-shadow-[0px_5px_5px_rgba(255,255,255,0.5)] dark:hover:bg-red-300 sm:w-24"
            onClick={handleReset}
          >
            リセット
          </button>
        </div>
      </form>
      <p className="mx-5 mt-5 border-t pt-5 text-gray-400">{`${
        search ? "検索結果" : "記事の総数"
      }: ${totalCount}件`}</p>
      <div className="mx-5 mt-4 flex flex-col justify-between sm:flex-row">
        <div className="flex w-full flex-col items-center drop-shadow-[0px_5px_5px_rgba(0,0,0,0.25)] dark:drop-shadow-[0px_5px_5px_rgba(255,255,255,0.3)]">
          {isSearchLoading ? (
            <p className="mb-5 w-full text-center sm:text-xl">記事を検索中...</p>
          ) : (
            <>
              {totalCount === 0 ? (
                <p className="mb-5 w-full text-center sm:text-xl">記事が見つかりませんでした。</p>
              ) : (
                <ul className="w-full">
                  {currentContents.map((content) => {
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
                              <li
                                className="flex items-center rounded-full bg-slate-200 px-2 drop-shadow-[0px_5px_5px_rgba(0,0,0,-0.15)] duration-500  dark:bg-slate-700"
                                key={tag.id}
                              >
                                <BsTag />
                                {tag.tag}
                              </li>
                            );
                          })}
                        </ul>
                        <Link href={`/blog/${content.id}`}>
                          <a className="w-fit">
                            <button className="my-5 rounded-xl bg-red-600 px-4 py-3 text-sm text-white drop-shadow-[0px_5px_5px_rgba(0,0,0,0.1)] duration-500 hover:bg-slate-900">
                              記事を読む {">>"}
                            </button>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
          {/* FIXME 検索機能を利用したときにactiveページが1に戻るようにしたい */}
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
            marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
            pageCount={pageCount}
            previousLabel="<"
            containerClassName={"pagination"}
            activeClassName={"pagination__active"}
            disabledClassName={"pagination__disabled"}
          />
        </div>
        <div className="mb-5">
          <h3 className="text-md mb-3 block w-full rounded bg-red-600 py-1.5 pl-2 font-bold text-white drop-shadow-[0px_5px_5px_rgba(0,0,0,0.35)] dark:drop-shadow-[0px_5px_5px_rgba(255,255,255,0.4)] sm:w-60">
            タグ
          </h3>
          <ul className="mx-1.5 flex flex-col gap-y-1">
            {[...props.tags.contents].reverse().map((tag) => {
              return (
                <li
                  key={tag.id}
                  className="flex items-center border-b pb-2 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.25)] dark:drop-shadow-[0px_5px_5px_rgba(255,255,255,0.6)]"
                >
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
});

Home.displayName = "Home";

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await client.getList({ endpoint: "blog" });
  const tags = await client.getList({ endpoint: "tag" });

  return { props: { blogs, tags } };
};

export default Home;
