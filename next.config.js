/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    // Workers have no image optimizer; sprites (raw.githubusercontent.com, pokeapi.co) are served as-is.
    unoptimized: true,
  },
};

export default config;
