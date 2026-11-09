"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Star } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import DeleteButton from "@/components/admin/DeleteButton";

type ListItem = {
  id: string;
  title: string;
  subtitle: string;
  starred?: boolean;
};

type SortableListProps = {
  heading: string;
  table: string;
  basePath: string;
  newLabel: string;
  emptyText: string;
  items: ListItem[];
};

const moveButtonClass =
  "p-2 rounded-md text-neutral-500 hover:bg-neutral-100 transition disabled:opacity-30 disabled:hover:bg-transparent";

export default function SortableList(props: SortableListProps) {
  const { heading, table, basePath, newLabel, emptyText, items } = props;
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function move(index: number, offset: number) {
    const target = index + offset;

    if (target < 0 || target >= items.length) return;

    setError(null);
    setBusyId(items[index].id);

    const ids = items.map((item) => item.id);
    const moved = ids[index];
    ids[index] = ids[target];
    ids[target] = moved;

    const supabase = createClient();

    const results = await Promise.all(
      ids.map((id, position) =>
        supabase
          .from(table)
          .update({ sort_order: (position + 1) * 10 })
          .eq("id", id)
      )
    );

    const failed = results.find((result) => result.error);

    if (failed && failed.error) {
      setError(failed.error.message);
      setBusyId(null);
      return;
    }

    setBusyId(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">{heading}</h1>
        <Link
          href={basePath + "/new"}
          className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-700 transition"
        >
          <Plus className="w-4 h-4" />
          {newLabel}
        </Link>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {items.length === 0 ? (
        <p className="text-neutral-400 text-sm">{emptyText}</p>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {items.map((item, index) => {
            const isBusy = busyId === item.id;
            const isAnyBusy = busyId !== null;
            const rowClass =
              index !== items.length - 1
                ? "flex items-center justify-between px-5 py-4 border-b border-neutral-200"
                : "flex items-center justify-between px-5 py-4";

            return (
              <div key={item.id} className={rowClass}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 shrink-0 text-xs text-neutral-300">
                    {index + 1}
                  </span>
                  {item.starred && (
                    <Star className="w-4 h-4 text-yellow-500 shrink-0 fill-yellow-500" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 truncate">
                      {item.title}
                    </p>
                    {item.subtitle && (
                      <p className="text-xs text-neutral-400 truncate">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {isBusy ? (
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-400 mx-2" />
                  ) : (
                    <>
                      <button
                        type="button"
                        aria-label="Move up"
                        disabled={index === 0 || isAnyBusy}
                        onClick={() => move(index, -1)}
                        className={moveButtonClass}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Move down"
                        disabled={index === items.length - 1 || isAnyBusy}
                        onClick={() => move(index, 1)}
                        className={moveButtonClass}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <Link
                    href={basePath + "/" + item.id + "/edit"}
                    className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <DeleteButton table={table} id={item.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}