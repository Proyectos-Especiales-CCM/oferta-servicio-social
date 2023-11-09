import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm?: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className="search-bar-container">
      <Input
        // label="Search"
        // isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
            "px-2 py-1",
            "h-9"
          ],
        }}
        placeholder="Buscar"
        startContent={
          <Search className="w-5 h-5 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        className="px-0 lg:px-3 w-[350px] lg:w-[400px] ml-0 lg:ml-4"
        onChange={(event) => onSearch(event.target.value)}
        value={searchTerm}
      />
    </div>
  );
}
