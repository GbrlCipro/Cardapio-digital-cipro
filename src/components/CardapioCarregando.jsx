export default function CardapioCarregando() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-8 sm:px-8">
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 rounded-2xl border border-linha p-3">
            <div className="h-24 w-24 shrink-0 animate-pulse rounded-xl bg-papel-dobra sm:h-28 sm:w-28" />
            <div className="flex flex-1 flex-col justify-center gap-2">
              <div className="h-4 w-2/3 animate-pulse rounded bg-papel-dobra" />
              <div className="h-3 w-full animate-pulse rounded bg-papel-dobra" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-papel-dobra" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
