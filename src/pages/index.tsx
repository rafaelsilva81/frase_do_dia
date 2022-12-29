import Head from "next/head";
import useSWR from "swr";
import { TwitterLogo } from "phosphor-react";

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/randomQuote",
    async (url) => {
      const res = await fetch(url);
      return await res.json();
    }
  );

  const changeQuote = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div> Loading... </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Quote generator</title>
        <meta name="description" content="Simple quote generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="flex flex-col items-center justify-center w-screen h-screen"
        style={{ backgroundColor: data.color }}
      >
        <div className="flex flex-col justify-center w-1/2 gap-4 p-6 bg-white rounded-md h-1/2">
          <div className="text-2xl font-bold text-center text-black">
            {data.text}
          </div>
          <div className="text-lg italic text-right text-black">
            - {data.author}
          </div>
        </div>

        <div className="flex flex-row justify-center w-1/2 gap-4 mt-4">
          <button
            className="flex items-center justify-center w-1/2 p-2 font-semibold bg-white rounded-md"
            style={{ color: data.color }}
            onClick={changeQuote}
          >
            New quote
          </button>
          <a
            className="flex items-center justify-center w-1/2 p-2 bg-white rounded-md"
            href={`https://twitter.com/intent/tweet?text=${data.text} - ${data.author}`}
            target="_blank"
            rel="noreferrer"
          >
            <TwitterLogo size={24} color={data.color} weight="bold" />
          </a>
        </div>

        {/* Footer stuck to the bottom */}
        <footer className="p-2 px-6 mt-4 bg-white rounded-md">
          <a
            className="flex items-center justify-center font-semibold"
            href="https://rafaeldev.me"
            target="_blank"
            rel="noreferrer"
            style={{ color: data.color }}
          >
            Made by @rafaelsilva81
          </a>
        </footer>
      </main>
    </>
  );
}
