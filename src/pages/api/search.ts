import type { NextApiRequest, NextApiResponse } from "next";
import { getDebugger } from "src/components/utils/Debugger";
import { client } from "src/libs/client";
import { Blog } from "src/types/blog";

const debug = getDebugger(true);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await client.getList<Blog>({ endpoint: "blog", queries: { q: req.body.q } });
  // TODO try catchで書く
  res.status(200).json(data);
};

export default handler;
