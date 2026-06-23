import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../test/renderWithTheme.tsx";
import { TextField } from "./TextField.tsx";

describe("TextField", () => {
  it("associates the label with the input", () => {
    renderWithTheme(<TextField label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("marks the input invalid and announces the error", () => {
    renderWithTheme(<TextField label="Email" error="Email is required" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Email is required");
    expect(input.getAttribute("aria-describedby")).toContain(alert.id);
  });

  it("describes the input with the hint when there is no error", () => {
    renderWithTheme(<TextField label="Name" hint="Use your full name" />);
    const input = screen.getByLabelText("Name");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.getByText("Use your full name")).toBeInTheDocument();
  });

  it("hides the hint once an error is present", () => {
    renderWithTheme(
      <TextField label="Name" hint="Use your full name" error="Too short" />,
    );
    expect(screen.queryByText("Use your full name")).not.toBeInTheDocument();
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });
});
