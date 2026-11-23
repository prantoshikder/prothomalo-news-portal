/** Lightweight shimmer shown while a dynamic route's params resolve. */
export default function PageSkeleton({ variant }: { variant: "category" | "article" }) {
  const bar = "animate-pulse rounded-lg bg-line";
  return (
    <div aria-busy="true" aria-label="লোড হচ্ছে" className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        {variant === "category" ? (
          <>
            <div className={`${bar} h-12 w-48`} />
            <div className={`${bar} h-5 w-2/3`} />
            <div className={`${bar} mt-6 aspect-[16/10] w-full rounded-xl`} />
          </>
        ) : (
          <>
            <div className={`${bar} h-4 w-32`} />
            <div className={`${bar} h-10 w-full`} />
            <div className={`${bar} h-10 w-3/4`} />
            <div className={`${bar} h-16 w-full`} />
            <div className={`${bar} aspect-[16/10] w-full rounded-2xl`} />
          </>
        )}
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${bar} h-5 w-full`} />
        ))}
      </div>
      <div className={`${bar} hidden h-[560px] rounded-2xl lg:block`} />
    </div>
  );
}
