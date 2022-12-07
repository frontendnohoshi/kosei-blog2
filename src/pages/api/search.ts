import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/libs/client";
import { Blog } from "src/pages";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body.q);
  const data = await client.getList<Blog>({ endpoint: "blog", queries: { q: req.body.q } });
  console.log(data);
// TODO try catchで書く
  res.status(200).json(data);
};

export default handler;
