import { Badge } from "@/components/ui/badge";
import { Button as UiButton } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ListFilter } from "lucide-react";
import React from "react";

interface SelectProps {
  value: string;
  title: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  canSearch?: boolean;
}

export default function Select({ value, title, options, onChange, canSearch }: SelectProps) {
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <UiButton
          variant="outline"
          size="sm"
          className="h-8 border-dashed px-1 truncate"
          onClick={() => setOpen(!open)}
        >
          <ListFilter className="mr-1 h-4 w-4" />
          {title}
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                1
              </Badge>
              <div className="hidden lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {options.find((opt) => opt.value === selectedValue)?.label}
                </Badge>
              </div>
            </>
          )}
        </UiButton>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          {canSearch && <CommandInput placeholder={title} />}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setSelectedValue(option.value);
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
