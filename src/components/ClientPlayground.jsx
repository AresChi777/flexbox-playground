"use client";
import { useMemo, useState } from "react";

const DIR = ["row", "col"];
const JUSTIFY = ["start","center","end","between","around","evenly"];
const ALIGN = ["start","center","end","stretch","baseline"];

export default function ClientPlayground() {
  const [items, setItems] = useState([0,1,2,3,4]);
  const [counter, setCounter] = useState(5);

  // 控制面板狀態
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("start");
  const [align, setAlign] = useState("start");
  const [wrap, setWrap] = useState(true);
  const [gap, setGap] = useState(4); // Tailwind gap 單位

  const containerClass = useMemo(() => {
    return [
      "flex",
      wrap ? "flex-wrap" : "flex-nowrap",
      direction === "row" ? "flex-row" : "flex-col",
      `justify-${justify}`,
      align === "stretch" ? "items-stretch" : align === "baseline" ? "items-baseline" : `items-${align}`,
      `gap-${gap}`
    ].join(" ");
  }, [wrap, direction, justify, align, gap]);

  const addItem = () => { setItems(p => [...p, counter]); setCounter(c => c+1); };
  const removeLast = () => setItems(p => p.slice(0,-1));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {/* 左側控制（占 2 欄） */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex gap-2">
          <button onClick={addItem} className="rounded-xl border px-3 py-2 hover:bg-neutral-50">Add Item</button>
          <button onClick={removeLast} className="rounded-xl border px-3 py-2 hover:bg-neutral-50">Remove Last</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <div className="mb-1 font-medium">Direction</div>
            <select value={direction} onChange={e=>setDirection(e.target.value)} className="w-full rounded-lg border px-3 py-2">
              {DIR.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>

          <label className="text-sm">
            <div className="mb-1 font-medium">Wrap</div>
            <select value={wrap ? "wrap" : "nowrap"} onChange={e=>setWrap(e.target.value==="wrap")} className="w-full rounded-lg border px-3 py-2">
              <option value="wrap">wrap</option>
              <option value="nowrap">nowrap</option>
            </select>
          </label>

          <label className="text-sm">
            <div className="mb-1 font-medium">Justify</div>
            <select value={justify} onChange={e=>setJustify(e.target.value)} className="w-full rounded-lg border px-3 py-2">
              {JUSTIFY.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </label>

          <label className="text-sm">
            <div className="mb-1 font-medium">Align Items</div>
            <select value={align} onChange={e=>setAlign(e.target.value)} className="w-full rounded-lg border px-3 py-2">
              {ALIGN.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>

          <label className="col-span-2 text-sm">
            <div className="mb-1 font-medium">Gap (Tailwind scale)</div>
            <input
              type="number" min={0} max={12} step={1}
              value={gap}
              onChange={e=>setGap(Number(e.target.value) || 0)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </label>
        </div>

        <div className="rounded-lg bg-neutral-50 p-3 text-xs">
          <div className="font-mono break-all">
            <span className="opacity-70">Container classes:</span><br/>
            <code>{containerClass}</code>
          </div>
        </div>
      </div>

      {/* 右側輸出（占 3 欄） */}
      <div className="md:col-span-3">
        <div className="rounded-2xl border-2 border-blue-600 p-4 min-h-64">
          <div className={containerClass}>
            {items.map(i => (
              <div key={i} className="h-16 w-28 flex items-center justify-center rounded-xl border bg-white shadow-sm">
                <span className="font-medium">Index: {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
