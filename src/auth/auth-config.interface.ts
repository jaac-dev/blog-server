import { Provider } from "./provider";

export const AUTH_CONFIG = Symbol();

export interface AuthConfig {
  providers: Array<Provider>;
}
