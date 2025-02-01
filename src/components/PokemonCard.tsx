import { Pokemon } from "../interfaces/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div
      className="cursor-pointer border-2 border-black bg-white transition-shadow duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      onClick={() => onClick(pokemon)}
    >
      <div className="relative aspect-square overflow-hidden border-b-2 border-black">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform object-contain"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold capitalize">{pokemon.name}</h2>
        <div className="mb-2 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="bg-black px-2 py-1 text-xs font-semibold uppercase text-white"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 text-sm">
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
