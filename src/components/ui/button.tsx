import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#E31E24] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#E31E24] text-white hover:bg-[#C91A20] hover:scale-105",
        destructive:
          "bg-[#E31E24] text-white hover:bg-[#C91A20] focus-visible:ring-[#E31E24]/20",
        outline:
          "border border-[#E5E5E5] bg-white text-[#1a1a1a] hover:bg-[#F5F5F5] hover:border-[#E31E24]",
        secondary:
          "bg-[#F5F5F5] text-[#1a1a1a] hover:bg-[#E5E5E5]",
        ghost:
          "hover:bg-[#F5F5F5] hover:text-[#1a1a1a]",
        link: "text-[#E31E24] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-6 has-[>svg]:px-4 text-base",
        icon: "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
