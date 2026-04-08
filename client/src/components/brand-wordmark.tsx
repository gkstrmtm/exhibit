import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  size?: "xs" | "sm" | "md";
  className?: string;
};

const sizeMap: Record<NonNullable<BrandWordmarkProps["size"]>, string> = {
  xs: "text-sm",
  sm: "text-lg",
  md: "text-xl",
};

export function BrandWordmark({ size = "md", className }: BrandWordmarkProps) {
  return (
    <span className={cn("font-display font-bold tracking-tight", sizeMap[size], className)}>
      EXHIBIT
    </span>
  );
}