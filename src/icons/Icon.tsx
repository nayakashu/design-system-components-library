import type { SVGProps } from "react";

export type IconName =
  | "check"
  | "close"
  | "chevron-down"
  | "chevron-right"
  | "search"
  | "plus"
  | "minus"
  | "info"
  | "warning"
  | "error"
  | "external-link";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  // Pixel size for width and height. Defaults to 20.
  size?: number;
  // An accessible label. When omitted the icon is hidden from assistive tech,
  // which is correct for an icon that sits beside a text label.
  title?: string;
}

// Each path is drawn on a 24 by 24 grid with currentColor, so an icon inherits
// the text color of its context and scales with the size prop.
const paths: Record<IconName, string> = {
  check: "M20 6 9 17l-5-5",
  close: "M18 6 6 18M6 6l12 12",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-right": "m9 6 6 6-6 6",
  search: "m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  info: "M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  warning: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  error: "M12 8v4M12 16h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  "external-link": "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
};

export const iconNames = Object.keys(paths) as IconName[];

export function Icon({ name, size = 20, title, ...rest }: IconProps) {
  const decorative = !title;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d={paths[name]} />
    </svg>
  );
}
