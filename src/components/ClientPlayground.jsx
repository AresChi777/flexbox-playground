"use client";

import { useState } from "react";

export default function ClientPlayground() {
  const [items, setItems] = useState([0, 1, 2, 3, 4]);
  const [counter, setCounter] = useState(5);

  const addItem = () => {
    setItems((prev) => [...prev, counter]);
    setCounter((c) => c + 1);
  };

  return (
    <>
      <div className="sticky top-0 z-10 pb-4 bg-white/0">
        <button
          onClick={addItem}
          className="rounded-xl border px-4 py-2 font-medium hover:bg-neutral-50 active:scale-[.99]"
        >
          Add Flex Item
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {items.map((idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 shadow-sm"
          >
            <span className="font-medium">Index: {idx}</span>
          </div>
        ))}
      </div>
    </>
  );
}
