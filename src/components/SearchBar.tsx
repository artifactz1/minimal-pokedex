import { Input } from "~/components/ui/input"
import { Search } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string
  onSearchTermChange: (term: string) => void
}

export default function SearchBar({ searchTerm, onSearchTermChange }: SearchBarProps) {
  return (
    <div className="mb-6 relative">
      <Input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="pl-10 h-12 text-lg border-2 border-black rounded-none"
      />
      <Search className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
    </div>
  )
}