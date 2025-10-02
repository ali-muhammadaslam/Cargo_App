import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Load everything inside the `app/` directory
export function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

// Register entry point
registerRootComponent(App);
