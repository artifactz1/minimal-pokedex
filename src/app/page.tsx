"use client";

import { useEffect, useState } from "react";
import PokemonCard from "~/components/PokemonCard";
import PokemonDetailsDialog from "~/components/PokemonDetailsDialog";
import SearchBar from "~/components/SearchBar";
import type { Pokemon } from "~/interfaces/Pokemon";
import type { PokemonListResponse } from "~/interfaces/PokemonListResponse";

export default function HomePage() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
        );
        if (!response.ok) throw new Error("Failed to fetch Pokemon list");

        const data = (await response.json()) as PokemonListResponse;

        const pokemonDetails: Pokemon[] = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            if (!res.ok)
              throw new Error(`Failed to fetch details for ${pokemon.name}`);

            const fullPokemon = (await res.json()) as Pokemon; // Ensure it's a `Pokemon`
            return {
              id: fullPokemon.id,
              name: fullPokemon.name,
              types: fullPokemon.types,
              sprites: fullPokemon.sprites,
              height: fullPokemon.height,
              weight: fullPokemon.weight,
              abilities: fullPokemon.abilities,
              stats: fullPokemon.stats,
            };
          }),
        );

        setAllPokemon(pokemonDetails);
        setDisplayedPokemon(pokemonDetails);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokemon data");
        setIsLoading(false);
      }
    };

    void fetchPokemon(); // Explicitly mark as ignored to avoid the promise warning
  }, []);

  // useEffect(() => {
  //   const filteredPokemon = allPokemon.filter(
  //     (poke) =>
  //       poke.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       poke.types.some((type) =>
  //         type.type.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //       ),
  //   );
  //   setDisplayedPokemon(filteredPokemon);
  // }, [searchTerm, allPokemon]);

  // const handleCardClick = (pokemon: Pokemon) => {
  //   setSelectedPokemon(pokemon);
  // };

  useEffect(() => {
    let filteredPokemon = allPokemon;

    if (selectedType !== "all") {
      filteredPokemon = filteredPokemon.filter((poke) =>
        poke.types.some((type) => type.type.name === selectedType),
      );
    }

    filteredPokemon = filteredPokemon.filter(
      (poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poke.types.some((type) =>
          type.type.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

    if (sortBy === "name") {
      filteredPokemon.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filteredPokemon.sort((a, b) => a.id - b.id);
    }

    setDisplayedPokemon(filteredPokemon);
  }, [searchTerm, allPokemon, selectedType, sortBy]);

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="my-8 text-center text-4xl font-bold uppercase tracking-wide">
        MINIMAL Pokédex
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        selectedType={selectedType}
        onSelectTypeChange={setSelectedType}
        sortBy={sortBy}
        onSetSortByChange={setSortBy}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array(20)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse bg-gray-100"
                ></div>
              ))
          : displayedPokemon.map((poke) => (
              <PokemonCard
                key={poke.id}
                pokemon={poke}
                onClick={handleCardClick}
              />
            ))}
      </div>
      {displayedPokemon.length === 0 && !isLoading && (
        <p className="mt-8 text-center text-gray-500">
          No Pokémon found matching your search.
        </p>
      )}
      <PokemonDetailsDialog
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}
