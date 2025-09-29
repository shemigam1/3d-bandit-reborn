import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function QuotaTracker({
  count,
  max = 10,
}: {
  count: number;
  max?: number;
}) {
  const pct = Math.min(100, Math.round((count / max) * 100));
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upload Quota</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>
            {count} / {max} files
          </span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-foreground"
            style={{ width: pct + "%" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
