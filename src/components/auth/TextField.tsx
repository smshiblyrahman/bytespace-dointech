import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, id, className, ...props }: TextFieldProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={inputId} className="font-body text-sm font-medium leading-[1.2] text-shuttle-950">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "h-[52px] w-full rounded-xl border bg-white px-6 py-3 font-body text-lg leading-[1.6] text-shuttle-950 outline-none transition-[border-color,box-shadow] placeholder:text-shuttle-400 focus:border-persian-blue-800 focus:shadow-[0_0_0_4px_rgb(0_59_226/0.12)]",
          error ? "border-red-500" : "border-shuttle-100",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="font-body text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
