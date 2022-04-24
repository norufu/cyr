import type { User, Note } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Quote } from "@prisma/client";

export function getQuote() {
  return prisma.quote.findMany({
  });
}

export async function getRandomQuote() {
  const quoteCount = await prisma.quote.count();
  const skip = Math.floor(Math.random() * quoteCount);
  return await prisma.quote.findMany({
      take: 5,
      skip: skip
  });
}