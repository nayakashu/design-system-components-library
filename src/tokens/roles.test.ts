import { describe, it, expect } from "vitest";
import { lightTheme, darkTheme, themes } from "./roles.ts";
import type { RoleTokens } from "./roles.ts";

// The contract guarantee: every theme binds the exact same set of role names.
// A theme that drops or adds a color role would let component code reference a
// token that is undefined under another theme. This test guards that boundary.
describe("role token contract", () => {
  it("light and dark bind the identical set of color roles", () => {
    const lightRoles = Object.keys(lightTheme.color).sort();
    const darkRoles = Object.keys(darkTheme.color).sort();
    expect(darkRoles).toEqual(lightRoles);
  });

  it("resolves every color role to a non-empty value in every theme", () => {
    for (const theme of Object.values(themes) as RoleTokens[]) {
      for (const [role, value] of Object.entries(theme.color)) {
        expect(value, `color role "${role}" must resolve to a value`).toBeTruthy();
      }
    }
  });
});
