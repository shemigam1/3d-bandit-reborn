// import { cn } from "~/lib/utils";
import { cn } from "@/lib/utils";

interface BanditIconProps {
  className?: string;
}

export function BanditIcon({ className }: BanditIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 250 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
    >
      <path d="M125 0L250 125V250H125L0 125V0H125Z" fill="currentColor" />
      <path
        d="M125 250L0 125L125 0L250 125L125 250Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="10"
      />
      <path
        d="M125 250L0 125L125 0L250 125L125 250Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="10"
      />
      <path d="M125 125L180 180V125L125 70V125Z" fill="currentColor" />
      <path d="M125 125L180 70V125L125 180V125Z" fill="currentColor" />
      <path
        d="M125 125L70 180V125L125 70V125Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M125 125L70 70V125L125 180V125Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M125 125L180 180V125L125 180V125Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M125 125L180 70V125L125 70V125Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M125 125L70 180V125L125 180V125Z" fill="currentColor" />
      <path d="M125 125L70 70V125L125 70V125Z" fill="currentColor" />
    </svg>
  );
}
