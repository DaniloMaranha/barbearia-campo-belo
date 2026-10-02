import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-accent hover:-translate-y-0.5 shadow-red",
  outline:
    "border border-foreground/30 text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5",
  ghost: "text-foreground/80 hover:text-primary",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.7rem]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
