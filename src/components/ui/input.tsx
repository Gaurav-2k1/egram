import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-[#1a1a1a] placeholder:text-[#666] selection:bg-[#E31E24] selection:text-white dark:bg-input/30 border-[#E5E5E5] flex h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-base bg-white transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#E31E24] focus-visible:ring-[#E31E24]/20 focus-visible:ring-2",
        "aria-invalid:ring-[#E31E24]/20 dark:aria-invalid:ring-[#E31E24]/40 aria-invalid:border-[#E31E24]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
