export function StorageUsage() {
  const used = 5.7
  const total = 15
  const pct = Math.min(100, (used / total) * 100)
  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6">
      <h3 className="font-semibold">Storage Usage</h3>
      <p className="mt-1 text-muted-foreground text-sm">Zadar, Croatia</p>
      <div className="mt-4 text-sm">
        <div className="flex items-center justify-between">
          <span>{used} GB</span>
          <span className="text-muted-foreground">{total} GB</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-foreground" style={{ width: pct + "%" }} />
        </div>
      </div>
    </div>
  )
}
