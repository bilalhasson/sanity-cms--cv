import { IconArrowLeft, IconArrowRight } from "@workspace/ui/components/icon";
import { cn } from "@workspace/ui/lib/utils";

const Buttons = ({
  rightBtnDisabled,
  leftBtnDisabled,
  scroll,
  booksCount,
}: {
  rightBtnDisabled: boolean;
  leftBtnDisabled: boolean;
  scroll: (direction: "left" | "right") => void;
  booksCount: number;
}) => {
  return (
    <>
      <button
        aria-label="Scroll left"
        disabled={leftBtnDisabled}
        className={cn(
          rightBtnDisabled && "animate-bounce-x",
          "flex items-center justify-center dark:bg-muted disabled:bg-muted disabled:cursor-not-allowed",
          "dark:disabled:opacity-50",
          "border-accent-green [&>svg]:stroke-accent-green",
          "absolute -left-0 top-1/2 h-10 w-10 border-2 z-10 bg-white/80 hover:bg-white rounded-full shadow transition pointer-events-auto",
          booksCount === 1 && "hidden",
          booksCount <= 2 && "md:hidden",
          booksCount <= 4 && "xl:hidden",
        )}
        onClick={() => scroll("left")}
      >
        <IconArrowLeft size={40} absoluteStrokeWidth />
      </button>
      <button
        aria-label="Scroll right"
        disabled={rightBtnDisabled}
        className={cn(
          !rightBtnDisabled && "animate-bounce-x",
          "flex items-center justify-center",
          "dark:disabled:opacity-50",
          "dark:bg-muted disabled:bg-muted disabled:cursor-not-allowed",
          "border-accent-green [&>svg]:stroke-accent-green border-2 ",
          "absolute -right-0 top-1/2 h-10 w-10 z-10 bg-white/80 hover:bg-white rounded-full shadow transition pointer-events-auto",
          booksCount === 1 && "hidden",
          booksCount <= 2 && "md:hidden",
          booksCount <= 4 && "xl:hidden",
        )}
        onClick={() => scroll("right")}
      >
        <IconArrowRight size={40} absoluteStrokeWidth />
      </button>
    </>
  );
};

export { Buttons };
