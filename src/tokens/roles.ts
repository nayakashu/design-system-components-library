// Role tokens: semantic names that describe intent, not appearance.
// This is the public contract. Components consume role tokens only.
// A theme is one binding of roles to primitive values. Swapping a theme
// rebinds the same role names to different primitives, so component code
// never changes when the theme changes.

import { primitive } from "./primitives.ts";

export interface RoleTokens {
  color: {
    background: string;
    surface: string;
    surfaceRaised: string;
    border: string;
    borderStrong: string;
    text: string;
    textMuted: string;
    textInverse: string;
    accent: string;
    accentHover: string;
    accentText: string;
    danger: string;
    dangerHover: string;
    success: string;
    warning: string;
    focusRing: string;
  };
  space: typeof primitive.space;
  radius: typeof primitive.radius;
  fontSize: typeof primitive.fontSize;
  fontWeight: typeof primitive.fontWeight;
  lineHeight: typeof primitive.lineHeight;
  duration: typeof primitive.duration;
}

export const lightTheme: RoleTokens = {
  color: {
    background: primitive.color.white,
    surface: primitive.color.slate50,
    surfaceRaised: primitive.color.white,
    border: primitive.color.slate200,
    borderStrong: primitive.color.slate400,
    text: primitive.color.slate900,
    textMuted: primitive.color.slate600,
    textInverse: primitive.color.white,
    accent: primitive.color.blue600,
    accentHover: primitive.color.blue500,
    accentText: primitive.color.white,
    danger: primitive.color.red600,
    dangerHover: primitive.color.red500,
    success: primitive.color.green500,
    warning: primitive.color.amber500,
    focusRing: primitive.color.blue500,
  },
  space: primitive.space,
  radius: primitive.radius,
  fontSize: primitive.fontSize,
  fontWeight: primitive.fontWeight,
  lineHeight: primitive.lineHeight,
  duration: primitive.duration,
};

export const darkTheme: RoleTokens = {
  color: {
    background: primitive.color.black,
    surface: primitive.color.slate900,
    surfaceRaised: primitive.color.slate800,
    border: primitive.color.slate800,
    borderStrong: primitive.color.slate600,
    text: primitive.color.slate50,
    textMuted: primitive.color.slate400,
    textInverse: primitive.color.slate900,
    accent: primitive.color.blue500,
    accentHover: primitive.color.blue400,
    accentText: primitive.color.black,
    danger: primitive.color.red500,
    dangerHover: primitive.color.red600,
    success: primitive.color.green500,
    warning: primitive.color.amber500,
    focusRing: primitive.color.blue400,
  },
  space: primitive.space,
  radius: primitive.radius,
  fontSize: primitive.fontSize,
  fontWeight: primitive.fontWeight,
  lineHeight: primitive.lineHeight,
  duration: primitive.duration,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;
