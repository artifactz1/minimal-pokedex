// import Image from "next/image";
// import type { Pokemon } from "../interfaces/Pokemon";

// interface PokemonCardProps {
//   pokemon: Pokemon;
//   onClick: (pokemon: Pokemon) => void;
// }

// export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
//   // Fallback image in case the Pokémon image is missing
//   const imageUrl = pokemon.sprites.front_default || "/placeholder.png";

//   return (
//     <div
//       className="cursor-pointer border-2 border-black bg-white transition-shadow duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
//       onClick={() => onClick(pokemon)}
//     >
//       <div className="relative aspect-square overflow-hidden border-b-2 border-black">
//         {pokemon.sprites.front_default ? (
//           <Image
//             src={imageUrl}
//             alt={pokemon.name}
//             layout="fill"
//             objectFit="contain"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center bg-gray-200">
//             <span className="text-sm text-gray-500">No Image</span>
//           </div>
//         )}
//       </div>
//       <div className="p-4">
//         <h2 className="mb-2 text-xl font-bold capitalize">{pokemon.name}</h2>
//         <div className="mb-2 flex flex-wrap gap-2">
//           {pokemon.types.map((type) => (
//             <span
//               key={type.type.name}
//               className="bg-black px-2 py-1 text-xs font-semibold uppercase text-white"
//             >
//               {type.type.name}
//             </span>
//           ))}
//         </div>
//         <div className="flex w-full justify-between gap-1 text-sm">
//           {pokemon.stats.slice(0, 3).map((stat) => (
//             <div
//               key={stat.stat.name}
//               className="flex items-center justify-between"
//             >
//               <span className="mr-1 font-semibold uppercase">
//                 {stat.stat.name.slice(0, 3)}:
//               </span>
//               <span className="tabular-nums">{stat.base_stat}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import type { Pokemon } from "../interfaces/Pokemon";

// Define type-to-color mapping
// const typeColors: Record<string, string> = {
//   grass: "bg-green-500",
//   fire: "bg-red-500",
//   water: "bg-blue-500",
//   electric: "bg-yellow-400",
//   bug: "bg-lime-500",
//   normal: "bg-gray-400",
//   poison: "bg-purple-500",
//   ground: "bg-yellow-600",
//   fairy: "bg-pink-400",
//   fighting: "bg-orange-500",
//   psychic: "bg-pink-500",
//   rock: "bg-gray-700",
//   ghost: "bg-indigo-500",
//   ice: "bg-cyan-300",
//   dragon: "bg-indigo-600",
//   dark: "bg-gray-800",
//   steel: "bg-gray-500",
//   flying: "bg-blue-300",
// };

const typeColors: Record<string, string> = {
  grass: "bg-emerald-700", // Deep forest green
  fire: "bg-amber-700", // Burnt orange
  water: "bg-teal-700", // Dark teal
  electric: "bg-yellow-600", // Mustard yellow
  bug: "bg-lime-700", // Olive green
  normal: "bg-stone-500", // Muted gray-brown
  poison: "bg-purple-800", // Dark purple
  ground: "bg-yellow-800", // Earthy brown
  fairy: "bg-rose-600", // Dusty rose
  fighting: "bg-red-800", // Deep brick red
  psychic: "bg-fuchsia-700", // Muted magenta
  rock: "bg-stone-700", // Dark rock gray
  ghost: "bg-indigo-900", // Deep midnight blue
  ice: "bg-sky-700", // Muted ice blue
  dragon: "bg-indigo-800", // Deep royal blue
  dark: "bg-neutral-800", // Charcoal
  steel: "bg-gray-600", // Slate gray
  flying: "bg-sky-800", // Stormy sky blue
};

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  // Fallback image in case the Pokémon image is missing
  const imageUrl = pokemon.sprites.front_default || "/placeholder.png";

  return (
    <div
      className="cursor-pointer border-2 border-black bg-white transition-shadow duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      onClick={() => onClick(pokemon)}
    >
      <div className="relative aspect-square overflow-hidden border-b-2 border-black">
        {pokemon.sprites.front_default ? (
          <Image
            src={imageUrl}
            alt={pokemon.name}
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold capitalize">{pokemon.name}</h2>
        <div className="mb-2 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-2 py-1 text-xs font-semibold uppercase text-white ${
                typeColors[type.type.name] ?? "bg-gray-500"
              }`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="flex w-full justify-between gap-1 text-sm">
          {pokemon.stats.slice(0, 3).map((stat) => (
            <div
              key={stat.stat.name}
              className="flex items-center justify-between"
            >
              <span className="mr-1 font-semibold uppercase">
                {stat.stat.name.slice(0, 3)}:
              </span>
              <span className="tabular-nums">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
