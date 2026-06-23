import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon, iconNames } from "./Icon.tsx";

describe("Icon", () => {
  it("renders every named icon without error", () => {
    for (const name of iconNames) {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    }
  });

  it("is decorative and hidden from assistive tech without a title", () => {
    const { container } = render(<Icon name="check" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
  });

  it("exposes an accessible label when a title is given", () => {
    render(<Icon name="search" title="Search" />);
    const svg = screen.getByRole("img", { name: "Search" });
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("applies the size prop to width and height", () => {
    const { container } = render(<Icon name="plus" size={32} />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });
});
