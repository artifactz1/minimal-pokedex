import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedType: string;
  onSelectTypeChange: (select: string) => void;
  sortBy: string;
  onSetSortByChange: (select: string) => void;
}

export default function SearchBar({
  searchTerm,
  onSearchTermChange,
  selectedType,
  onSelectTypeChange,
  sortBy,
  onSetSortByChange,
}: SearchBarProps) {
  return (
    <main className="mb-6 flex w-full flex-col gap-4 md:flex-row">
      <Input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="h-12 rounded-none border-2 border-black pl-10 text-lg"
      />
      <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-black" />

      <div className="flex gap-2">
        <Select value={selectedType} onValueChange={onSelectTypeChange}>
          <SelectTrigger className="h-12 w-[180px] rounded-none border-2 border-black">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="fire">Fire</SelectItem>
            <SelectItem value="water">Water</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="grass">Grass</SelectItem>
            <SelectItem value="ice">Ice</SelectItem>
            <SelectItem value="fighting">Fighting</SelectItem>
            <SelectItem value="poison">Poison</SelectItem>
            <SelectItem value="ground">Ground</SelectItem>
            <SelectItem value="flying">Flying</SelectItem>
            <SelectItem value="psychic">Psychic</SelectItem>
            <SelectItem value="bug">Bug</SelectItem>
            <SelectItem value="rock">Rock</SelectItem>
            <SelectItem value="ghost">Ghost</SelectItem>
            <SelectItem value="dragon">Dragon</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={onSetSortByChange}>
          <SelectTrigger className="h-12 w-[180px] rounded-none border-2 border-black">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </main>
  );
}
