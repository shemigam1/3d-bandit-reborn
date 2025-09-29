import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function QuickUpload({
  onBrowse,
  onDropFiles,
}: {
  onBrowse: () => void
  onDropFiles: (files: FileList | File[]) => void
}) {
  const [dragActive, setDragActive] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    if (e.type === "dragleave") setDragActive(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      onDropFiles(e.dataTransfer.files)
    }
  }

  return (
    <div className="rounded-xl border bg-cyan-100/50 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Quick Upload</h3>
        <div className="bg-primary text-primary-foreground inline-flex h-6 w-6 items-center justify-center rounded-full text-xs">↑</div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div
          ref={dropRef}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onBrowse}
          className="cursor-pointer rounded-lg border border-dashed bg-white/60 p-6 text-sm text-center text-muted-foreground"
        >
          <div className={dragActive ? "text-foreground" : undefined}>
            Drag & Drop files here,
            <br /> or Click to Browse
          </div>
        </div>
        <div className="flex items-end">
          <Button className="w-full" onClick={onBrowse}>Browse Files</Button>
        </div>
      </div>
    </div>
  )
}
