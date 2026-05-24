import { createRequire } from "module";

const require = createRequire(import.meta.url);
const coreWebVitals = require("eslint-config-next/core-web-vitals");
const tsConfig = require("eslint-config-next/typescript");

const eslintConfig = [
  ...(Array.isArray(coreWebVitals) ? coreWebVitals : [coreWebVitals]),
  ...(Array.isArray(tsConfig) ? tsConfig : [tsConfig]),
  {
    ignores: [".next/", ".velite/", "node_modules/", "public/static/"],
  },
];

export default eslintConfig;
