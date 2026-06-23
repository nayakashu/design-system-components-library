// Binds the styled-components DefaultTheme to the role-token contract.
// Every styled component in a consuming app gets typed access to role tokens.
import "styled-components";
import type { RoleTokens } from "./tokens/roles.ts";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends RoleTokens {}
}
