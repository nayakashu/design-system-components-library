import styled, { css } from "styled-components";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.color.accent};
    color: ${({ theme }) => theme.color.accentText};
    border-color: ${({ theme }) => theme.color.accent};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.accentHover};
      border-color: ${({ theme }) => theme.color.accentHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.color.surfaceRaised};
    color: ${({ theme }) => theme.color.text};
    border-color: ${({ theme }) => theme.color.border};
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.color.borderStrong};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.color.danger};
    color: ${({ theme }) => theme.color.textInverse};
    border-color: ${({ theme }) => theme.color.danger};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.dangerHover};
      border-color: ${({ theme }) => theme.color.dangerHover};
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
    font-size: ${({ theme }) => theme.fontSize.md};
  `,
};

const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.lineHeight.tight};
  cursor: pointer;
  transition: background ${({ theme }) => theme.duration.fast} ease,
    border-color ${({ theme }) => theme.duration.fast} ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;

export function Button({
  variant = "primary",
  size = "md",
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} type={type} {...rest}>
      {children}
    </StyledButton>
  );
}
