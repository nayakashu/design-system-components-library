import styled from "styled-components";
import { useId, type InputHTMLAttributes } from "react";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  error?: string;
  hint?: string;
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.text};
`;

const Input = styled.input<{ $invalid: boolean }>`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.text};
  background: ${({ theme }) => theme.color.surfaceRaised};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.color.danger : theme.color.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: border-color ${({ theme }) => theme.duration.fast} ease;

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $invalid }) => ($invalid ? theme.color.danger : theme.color.focusRing)};
    outline-offset: 1px;
    border-color: transparent;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Hint = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.textMuted};
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.danger};
`;

// Accessible text input. The label is always associated by id. Hint and error
// are wired through aria-describedby, and aria-invalid reflects error state, so
// assistive technology announces the message when the field is focused.
export function TextField({ label, error, hint, ...rest }: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        $invalid={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && !error && <Hint id={hintId}>{hint}</Hint>}
      {error && (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      )}
    </Field>
  );
}
