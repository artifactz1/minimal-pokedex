import { Grid, IdCard, Maximize, Minimize, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import type { Pokemon } from "~/interfaces/Pokemon";

interface PokemonDetailsDialogProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export default function PokemonDetailsDialog({
  pokemon,
  onClose,
}: PokemonDetailsDialogProps) {
  if (!pokemon) return null;

  return (
    <Dialog open={!!pokemon} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg border-2 border-black bg-white p-0">
        <DialogHeader className="border-b-2 border-black p-6">
          <DialogTitle className="text-3xl font-bold uppercase">
            {pokemon.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-square overflow-hidden border-2 border-black">
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                layout="fill"
                objectFit="contain"
                className="absolute h-full w-full transform object-contain"
              />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold uppercase">Stats</h3>
              {pokemon.stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="mb-2 flex items-center justify-between"
                >
                  <span className="mr-2 uppercase">{stat.stat.name}:</span>
                  <span>{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="mb-2 text-xl font-bold uppercase">Details</h3>
              <p className="mb-2 flex items-center">
                <Grid className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="mr-2 font-bold uppercase">Height:</span>
                {pokemon.height / 10}m
              </p>
              <p className="flex items-center">
                <Maximize className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="mr-2 font-bold uppercase">Weight:</span>
                {pokemon.weight / 10}kg
              </p>
              <p className="flex items-center">
                <IdCard className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="mr-2 font-bold uppercase">ID:</span>
                {pokemon.id}
              </p>
            </div>
            <div>
              <h3 className="mb-2 flex items-center text-xl font-bold uppercase">
                <Minimize className="mr-2 h-5 w-5 flex-shrink-0" />
                Abilities
              </h3>
              <ul className="list-none pl-7">
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name} className="mb-1 capitalize">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 bg-black p-1 text-white transition-colors duration-200 hover:bg-gray-800"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
