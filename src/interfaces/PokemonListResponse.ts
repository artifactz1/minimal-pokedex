export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

// export interface PokemonDetails {
//   id: number;
//   name: string;
//   types: { type: { name: string } }[];
// }

export interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string }; // Add missing properties
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}
