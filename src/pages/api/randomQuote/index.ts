// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import quotesJson from "./quotes.json";

const colors = [
  "#ef4444", // tailwind red-500
  "#f59e0b", // tailwind yellow-500
  "#10b981", // tailwind green-500
  "#3b82f6", // tailwind blue-500
  "#6366f1", // tailwind indigo-500
  "#a855f7", // tailwind purple-500
  "#ec4899", // tailwind pink-500
  "#8b5cf6", // tailwind violet-500
  "#0ea5e9", // tailwind sky-500
  "#059669", // tailwind emerald-500
  "#f97316", // tailwind orange-500
  "#db2777", // tailwind fuchsia-500
  "#84cc16", // tailwind lime-500
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get a random quote from the list of quotes
  const quotes = quotesJson.quotes as Quote[];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Get a random color from the list of colors
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // Add the color to the quote
  randomQuote.color = randomColor;

  res.status(200).json(randomQuote);
}
