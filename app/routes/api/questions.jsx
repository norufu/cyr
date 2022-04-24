import { getRandomQuote } from "~/models/quote.server";
import { json } from "@remix-run/node";

export async function action({ request }) {
  console.log("QUESTIONS ACTION TESTING \N\N\N\N\N");
  const quotes = await getRandomQuote();
  console.log(quotes);
  return json({ quotes });
}

export async function loader({ request }) {
  console.log("QUESTIONS ACTION TESTING \N\N\N\N\N");
  const quotes = await getRandomQuote();
  console.log(quotes);
  return json({ quotes });
}