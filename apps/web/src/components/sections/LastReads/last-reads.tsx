"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useRef, useState, useEffect } from "react";
import { LastReadsProps } from "./types";
import { SanityImage } from "@/components/sanity-image";
import { handleScroll } from "./utils";
import { Buttons } from "./buttons";

// TODO: Extract carousel + Buttons to ui and import here
// TODO: Make use of the skeleton loader
// FIXME: push not working in vercel

const LastReads = ({ title, books }: LastReadsProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      // Allow a small threshold for floating point errors
      setAtStart(scrollLeft <= 50);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    };

    checkScroll();
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", checkScroll);

    return () => ref.removeEventListener("scroll", checkScroll);
  }, []);

  if (!books || books.length === 0) {
    return null;
  }

  const imageWidth = 250;

  return (
    <section className=" px-4 md:px-6 relative w-[calc(100vw-50px)] md:w-[calc(100vw-100px)] max-w-[1250px]  mx-auto my-16 ">
      <h2 className="text-3xl font-semibold md:text-5xl text-balance text-center">
        {title}
      </h2>
      <Buttons
        scroll={handleScroll(scrollRef, imageWidth)}
        booksCount={books.length}
        rightBtnDisabled={atEnd}
        leftBtnDisabled={atStart}
      />
      <ul
        ref={scrollRef}
        className={cn(
          books.length === 1 && "justify-center",
          books.length <= 2 && "md:justify-center",
          books.length <= 4 && "lg:justify-center",
          "flex gap-10 overflow-x-auto scrollbar-hide mt-8 px-8 py-4 snap-x snap-mandatory scroll-smooth outline-none focus:outline-none",
        )}
        tabIndex={0}
        role="list"
        aria-label="List of last reads"
      >
        {books.map((book) => (
          <li
            key={book._key}
            tabIndex={0}
            role="group"
            aria-label={`Book: ${book.title}`}
            className={`snap-start w-[250px] flex-shrink-0`}
          >
            {book.cover && (
              <SanityImage
                asset={book.cover}
                className="rounded shadow-lg h-[350px]"
                loading="lazy"
                alt={`Cover image of ${book.title}`}
              />
            )}
            <>
              <div className="space-y-2 mt-2">
                <div
                  title={`Percentage read: ${book.percentageCompleted}%`}
                  className="relative h-[13px] bg-accent-green/25 rounded mt-1 mb-2 overflow-hidden"
                >
                  <div
                    className="h-full bg-accent-green transition-all duration-300"
                    style={{ width: `${book.percentageCompleted}%` }}
                    aria-valuenow={book.percentageCompleted}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                    aria-label={`Progress read: ${book.percentageCompleted}%`}
                  />
                  <span
                    className={cn(
                      "text-accent-green-foreground",
                      "absolute inset-0 flex items-center justify-center text-[10px] font-medium pointer-events-none select-none",
                    )}
                  >
                    {book.percentageCompleted}%
                  </span>
                </div>
                <h3
                  title={book.title}
                  className="block truncate"
                  aria-label={`Title: ${book.title}`}
                >
                  {book.title}
                </h3>
              </div>
              <span
                title={book.author}
                className="block truncate text-xs"
                aria-label={`Author: ${book.author}`}
              >
                Author: {book.author}
              </span>
              <a
                href={book.goodreads}
                title={`good reads link to the book ${book.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="block text-xs text-blue-500 hover:underline"
                  aria-label={`Goodreads link for ${book.title}`}
                >
                  link
                </span>
              </a>
            </>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { LastReads };
