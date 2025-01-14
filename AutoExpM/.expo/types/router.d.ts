/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/addTransaction` | `/(tabs)/editTransaction` | `/_Controllers/transactionController` | `/_sitemap` | `/addTransaction` | `/editTransaction` | `/utils/api` | `/utils/general`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
