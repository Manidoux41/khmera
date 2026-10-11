export function RouteSkeleton() {
  return (
    <div
      aria-busy="true"
      className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div aria-hidden="true" className="space-y-6">
        <div className="h-8 w-32 rounded-full bg-slate-800" />
        <div className="h-16 max-w-xl rounded-2xl bg-slate-800" />
        <div className="h-6 max-w-lg rounded-full bg-slate-800" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 rounded-3xl bg-slate-900" />
          <div className="h-64 rounded-3xl bg-slate-900" />
        </div>
      </div>
    </div>
  );
}
