import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import { marked } from "marked";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, "slug not found");
  const post = await getPost(params.slug);

  invariant(post, "post not found");
  const html = marked(post.markdown);
  return json({ post, html });
};

export default function Slug() {
  const { post, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
