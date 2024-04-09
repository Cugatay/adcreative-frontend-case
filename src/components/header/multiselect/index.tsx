import { cn } from "@/helpers/cn";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type APIResponseDTO } from "@/types/api-response.type";
import ResultContent from "./ResultContent";
import fetchApi from "@/helpers/fetchApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import MultiselectInput from "./multiselect-input";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function MultiSelect() {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const virtualizerContainer = useRef<HTMLDivElement>(null);

  const {
    isFetching,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    data,
  } = useInfiniteQuery<APIResponseDTO>({
    queryKey: ["repoData", text],
    enabled: !!text,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info?.next) return undefined;

      const nextPage = new URL(lastPage.info.next).searchParams.get("page");

      if (isNaN(Number(nextPage))) return undefined;
      return Number(nextPage);
    },
    queryFn: ({ pageParam }) =>
      fetchApi({ pageParam: pageParam as number, text }),
  });

  const results = useMemo(
    () => data?.pages?.flatMap((page) => page.results).filter((p) => p) ?? [],
    [data?.pages],
  );

  const rowVirtualizer = useVirtualizer({
    count:
      hasNextPage || isFetching || isFetchingNextPage
        ? results.length + 1
        : results.length,
    getScrollElement: () => virtualizerContainer.current,
    estimateSize: () => 40,
  });

  useEffect(() => {
    const popup: HTMLDivElement | null = document.getElementById(
      "results-popup",
    ) as HTMLDivElement;

    if (!popup || isFetching || isFetchingNextPage || !hasNextPage) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = popup;

      if (scrollTop + clientHeight >= scrollHeight) {
        fetchNextPage();
      }
    };

    popup.addEventListener("scroll", handleScroll);

    return () => {
      popup.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, isFetchingNextPage, hasNextPage, isFetching]);

  return (
    <div className="flex-1">
      <div
        className={cn(
          "relative z-10 mx-auto mt-2 h-14 w-full cursor-text pb-2 transition-all duration-300 md:mx-0",
          isFocused ? "max-w-lg" : "max-w-96",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <MultiselectInput
          ref={inputRef}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          text={text}
          setText={setText}
          hoverIndex={hoverIndex}
          setHoverIndex={setHoverIndex}
          results={results}
        />

        <div
          onClick={(e) => e.stopPropagation()}
          id="results-popup"
          className={cn(
            "absolute left-0 h-max max-h-96 w-full cursor-auto overflow-y-auto rounded-b-2xl rounded-t-[4px] bg-paper transition-all duration-300",
            isFocused && text.length
              ? "top-14 opacity-100"
              : "pointer-events-none top-4 opacity-0",
          )}
        >
          {error ? (
            <div className="text-center text-red-400">
              An error occurred, please try again later
            </div>
          ) : !results.length && !isFetching ? (
            <div className="py-2 text-center">No results found</div>
          ) : (
            <div
              ref={virtualizerContainer}
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
              }}
              className="relative w-full"
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const character = results[virtualRow.index];
                if (!character) return null;

                return (
                  <>
                    <ResultContent
                      key={virtualRow.index}
                      character={character}
                      text={text}
                      hoverIndex={hoverIndex}
                      setHoverIndex={setHoverIndex}
                      index={virtualRow.index}
                      ref={inputRef}
                    />
                  </>
                );
              })}

              {isFetching || isFetchingNextPage ? (
                <LoadingSpinner className="my-2" />
              ) : null}
            </div>
          )}
        </div>
      </div>

      {isFocused && (
        <div
          onClick={() => setIsFocused(false)}
          className="fixed left-0 top-0 h-full w-full bg-black/50"
        />
      )}
    </div>
  );
}
