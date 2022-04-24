import { getRandomQuote } from "~/models/quote.server";
import { json } from "@remix-run/node";

export async function action({ request }) {
  const quotes = await getRandomQuote();
  console.log("getting random");
  return json({ quotes });
}

export async function loader({ request }) {
  const quotes = await getRandomQuote();
  return json({ quotes });
}