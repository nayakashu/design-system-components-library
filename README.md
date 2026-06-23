# design-system-components-library

A design-system component library with a role-named token layer and a versioned library-to-consumer contract. TypeScript, React 19, and styled-components.

Built as a public sample for [nayakashu.dev](https://www.nayakashu.dev/). It recreates, generically, the kind of design-system foundation I build on platform teams.

## The design decision

The token model has two tiers.

**Primitive tokens** are raw values with no meaning attached. `blue600`, `slate900`, `space.lg`. Consumers never reference these directly.

**Role tokens** are semantic names that describe intent, not appearance. `color.accent`, `color.danger`, `color.surface`. A theme is one binding of role names to primitive values. Components consume role tokens only.

The role layer is the public contract. The primitive layer is an implementation detail. Because component code references role names, swapping a theme rebinds the same roles to different primitives and no component changes. A test in `src/tokens/roles.test.ts` guards the boundary: every theme must bind the identical set of role names, so a component can never reference a token that is undefined under another theme.

## The versioned contract

`src/index.ts` is the entire public surface. Anything exported there is part of the 1.x contract. Internal modules stay out of the barrel and can change without a major version. Consumers depend on the export surface and the role-token names, not on file layout or primitive values.

## Install

```bash
npm install @nayakashu/design-system-components-library
```

`react`, `react-dom`, and `styled-components` are peer dependencies. Consumers bring their own.

## Usage

```tsx
import { ThemeProvider, Button, TextField, Badge } from "@nayakashu/design-system-components-library";

export function App() {
  return (
    <ThemeProvider theme="dark">
      <Button variant="primary">Save</Button>
      <TextField label="Email" hint="We never share your address." />
      <Badge tone="success">Stable</Badge>
    </ThemeProvider>
  );
}
```

Pass a built-in theme name (`"light"` or `"dark"`), or a fully custom `RoleTokens` object to brand the whole tree from one binding.

The styled-components `DefaultTheme` is augmented with the role-token contract in `src/styled.d.ts`, so every styled component in a consuming app gets typed access to the role tokens.

## Components

- `Button` — primary, secondary, and danger variants; visible focus ring; disabled state.
- `TextField` — labeled input with hint and error, wired through `aria-describedby` and `aria-invalid`.
- `Badge` — neutral, accent, success, warning, and danger tones.
- `Icon` — a set of stroke icons drawn with `currentColor`, decorative by default and labeled on demand.

Accessibility is checked in Storybook through the a11y addon and in unit tests through label association and ARIA assertions.

## Storybook foundations

Beyond the component stories, Storybook documents the foundation layer:

- **Color palette** — the primitive palette, and the role tokens resolved side by side under each theme.
- **Icons** — the full icon gallery, scalable and color-inheriting.
- **Theming** — a live builder that edits role tokens and rebinds real components in place, with no change to component code.

## Scripts

```bash
npm run storybook        # component explorer with a light/dark theme switcher
npm test                 # Vitest and React Testing Library
npm run typecheck        # tsc --noEmit
npm run build            # library build to dist with bundled type declarations
npm run build-storybook  # static Storybook
```

## Stack

TypeScript, React 19, styled-components, Storybook, Vitest, React Testing Library, Vite, GitHub Actions.

## License

MIT
