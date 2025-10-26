import ClientPlayground from "@/components/ClientPlayground";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        <aside className="w-96 shrink-0 border-r border-neutral-200 bg-white p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-semibold">Flexbox Playground</span>
          </div>
          <div className="mt-4 space-y-4 text-sm text-neutral-600">
            <p>Edit properties of the flex container here. Click an item on the right to edit its properties.</p>
            <p className="text-neutral-500">Coming soon: flex-direction, flex-wrap, justify-content, align-items, gap…</p>
          </div>
        </aside>

        <section className="flex-1 p-6">
          <div className="h-full rounded-2xl border-2 border-blue-600 p-4">
            {/* 把互動移到 Client Component */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            {/* ↓↓↓ */}
            <ClientPlayground />
          </div>
        </section>
      </div>
    </main>
  );
}



