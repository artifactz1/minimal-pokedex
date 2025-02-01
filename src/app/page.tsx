"use client"

import { useState, useEffect } from 'react'
import { Pokemon } from './interfaces/Pokemon'
import PokemonCard from '~/components/PokemonCard'
import PokemonDetailsDialog from '~/components/PokemonDetailsDialog'
import SearchBar from '~/components/SearchBar'


export default function HomePage() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        const data = await response.json()
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url)
            return res.json()
          })
        )
        setAllPokemon(pokemonDetails)
        setDisplayedPokemon(pokemonDetails)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch Pokemon data')
        setIsLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  useEffect(() => {
    const filteredPokemon = allPokemon.filter(poke => 
      poke.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poke.types.some(type => type.type.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setDisplayedPokemon(filteredPokemon)
  }, [searchTerm, allPokemon])

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 uppercase tracking-wide">Pokédex</h1>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading
          ? Array(20).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 h-64 animate-pulse"></div>
            ))
          : displayedPokemon.map((poke) => (
              <PokemonCard key={poke.id} pokemon={poke} onClick={handleCardClick} />
            ))}
      </div>
      {displayedPokemon.length === 0 && !isLoading && (
        <p className="text-center text-gray-500 mt-8">No Pokémon found matching your search.</p>
      )}
      <PokemonDetailsDialog pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
    </div>
  )
}
