import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-[#E5E5E5] placeholder:text-[#666] focus-visible:border-[#E31E24] focus-visible:ring-[#E31E24]/20 aria-invalid:ring-[#E31E24]/20 dark:aria-invalid:ring-[#E31E24]/40 aria-invalid:border-[#E31E24] dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-lg border bg-white px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
