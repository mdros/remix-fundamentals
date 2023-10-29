import { prisma } from "~/db.server";
import { Prisma } from "@prisma/client";
import PostCreateInput = Prisma.PostCreateInput;

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

// 🐨 export a new function called createPost which accepts a title, slug, and markdown
// and returns the newly created post.

export async function createPost(post: PostCreateInput) {
  return prisma.post.create({ data: post });
}

// 💰 Here's an example of how you use prisma to create a new record:
// prisma.dogo.create({ data: { name: "Good Dogo" } });
// in our case, that'll be prisma.post.create
