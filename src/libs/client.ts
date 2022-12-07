import { createClient } from "microcms-js-sdk"; //ES6

export const client = createClient({
  serviceDomain: "kosei-blog",
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});
