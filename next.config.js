/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["raw.githubusercontent.com", "pokeapi.co"], // Add domains used for Pokémon images
  },
};

export default config;
