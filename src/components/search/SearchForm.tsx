/** Big search box that submits to /search via GET. */
export default function SearchForm({ defaultValue = "", autoFocus = false }: { defaultValue?: string; autoFocus?: boolean }) {
  return (
    <form action="/search" role="search" className="relative mt-6">
      <input
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="শিরোনাম, বিষয় বা স্থান লিখুন..."
        aria-label="খবর খুঁজুন"
        className="w-full rounded-2xl border-2 border-line bg-surface py-4 pr-32 pl-5 text-lg shadow-sm outline-none focus:border-brand"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl bg-brand px-5 py-2.5 font-semibold text-white transition hover:brightness-110"
      >
        খুঁজুন
      </button>
    </form>
  );
}
