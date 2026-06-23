import styled from "styled-components";
import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "accent" | "success" | "danger" | "warning";

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

const toneColor = {
  neutral: { fg: "textMuted", bd: "border" },
  accent: { fg: "accent", bd: "accent" },
  success: { fg: "success", bd: "success" },
  danger: { fg: "danger", bd: "danger" },
  warning: { fg: "warning", bd: "warning" },
} as const;

const StyledBadge = styled.span<{ $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.none} ${theme.space.sm}`};
  height: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $tone }) => theme.color[toneColor[$tone].fg]};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme, $tone }) => theme.color[toneColor[$tone].bd]};
  border-radius: ${({ theme }) => theme.radius.pill};
  line-height: 1;
`;

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return <StyledBadge $tone={tone}>{children}</StyledBadge>;
}
