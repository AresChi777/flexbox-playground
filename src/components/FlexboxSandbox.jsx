// src/components/FlexboxSandbox.jsx
"use client";

import { useMemo, useState } from "react";

const DIR = ["row", "col"];
const JUSTIFY = ["start", "center", "end", "between", "around", "evenly"];
const ALIGN = ["start", "center", "end", "stretch", "baseline"];

export default function FlexboxSandbox() {
  // items 與控制狀態
  const [items, setItems] = useState([0, 1, 2, 3, 4]);
  const [counter, setCounter] = useState(5);

  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("start");
  const [align, setAlign] = useState("start");
  const [wrap, setWrap] = useState(true);
  const [gap, setGap] = useState(4);

  const containerClass = useMemo(() => {
    return [
      "flex",
      wrap ? "flex-wrap" : "flex-nowrap",
      direction === "row" ? "flex-row" : "flex-col",
      `justify-${justify}`,
      align === "stretch"
        ? "items-stretch"
        : align === "baseline"
        ? "items-baseline"
        : `items-${align}`,
      `gap-${gap}`,
      "min-h-64", // 讓容器有基本高度
    ].join(" ");
  }, [wrap, direction, justify, align, gap]);

  const addItem = () => {
    setItems((p) => [...p, counter]);
    setCounter((c) => c + 1);
  };
  const removeLast = () => setItems((p) => p.slice(0, -1));
  const clearAll = () => setItems([]);

  return (
    <div className="flex h-full">
      {/* 左側：UI 控制面板（只顯示控制，不顯示任何 item） */}
      <aside className="w-96 shrink-0 border-r border-neutral-200 bg-brand-lightgray p-4 overflow-y-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-brand-orange">Flexbox Playground</h1>
          <p className="mt-1 text-sm text-neutral-600">
            調整左側控制，右側區域會即時反映。
          </p>
        </div>

        {/* 動作按鈕 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addItem}
            className="rounded-xl border px-3 py-2 hover:bg-neutral-50 text-brand-orange"
          >
            Add Item
          </button>
          <button
            onClick={removeLast}
            className="rounded-xl border px-3 py-2 hover:bg-neutral-50 text-brand-orange"
          >
            Remove Last
          </button>
          <button
            onClick={clearAll}
            className="rounded-xl border px-3 py-2 hover:bg-neutral-50 text-brand-orange"
          >
            Clear
          </button>
        </div>

        {/* Flex 屬性控制 */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-sm">
            <div className="mb-1 font-medium text-brand-orange">Direction</div>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-brand-orange"
            >
              {DIR.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <div className="mb-1 font-medium text-brand-orange">Wrap</div>
            <select
              value={wrap ? "wrap" : "nowrap"}
              onChange={(e) => setWrap(e.target.value === "wrap")}
              className="w-full rounded-lg border px-3 py-2 text-brand-orange"
            >
              <option value="wrap">wrap</option>
              <option value="nowrap">nowrap</option>
            </select>
          </label>

          <label className="text-sm">
            <div className="mb-1 font-medium text-brand-orange">Justify</div>
            <select
              value={justify}
              onChange={(e) => setJustify(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-brand-orange"
            >
              {JUSTIFY.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <div className="mb-1 font-medium text-brand-orange">Align Items</div>
            <select
              value={align}
              onChange={(e) => setAlign(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-brand-orange"
            >
              {ALIGN.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="col-span-2 text-sm">
            <div className="mb-1 font-medium text-brand-orange">Gap (Tailwind scale)</div>
            <input
              type="number"
              min={0}
              max={12}
              step={1}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value) || 0)}
              className="w-full rounded-lg border px-3 py-2 text-brand-orange"
            />
          </label>
        </div>

        {/* 目前的 container class 顯示（方便複製） */}
        <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-xs">
          <div className="font-mono break-all">
            <span className="opacity-70 text-brand-orange">Container classes:</span>
            <br />
            <code className=" text-brand-orange">{containerClass}</code>
          </div>
        </div>
      </aside>

      {/* 右側：Flexbox 預覽（只顯示結果） */}
      <section className="flex-1 p-6">
        <div className="h-full rounded-2xl border-2 border-brand-gold bg-brand-lightgray p-4 ">
          <div className={containerClass}>
            {items.map((i) => (
              <div
                key={i}
                className="h-16 w-28 flex items-center justify-center rounded-xl border border-brand-orangeDark bg-brand-orangeDark shadow-sm"
              >
                <span className="font-medium text-brand-orange">Index: {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
