import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import fsdImportsRule from "./eslint-rules/fsd-imports.js";

// Create plugin for FSD rules
const fsdPlugin = {
  rules: {
    "fsd-imports": fsdImportsRule,
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "fsd": fsdPlugin,
    },
    rules: {
      "fsd/fsd-imports": "error",
    },
  },
]);

export default eslintConfig;
