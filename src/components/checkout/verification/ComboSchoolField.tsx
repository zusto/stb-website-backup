import * as React from "react";
import { Check, ChevronsUpDown, ArrowDown } from "lucide-react"; // ChevronsUpDown might not be allowed, will use ArrowDown
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { School } from "@/hooks/useSchoolsList"; // Ensure School type is imported

interface ComboSchoolFieldProps {
  identifier: string; // OPEID or manually typed school name
  isManual: boolean;
  onIdentifierChange: (id: string) => void;
  onIsManualChange: (isManual: boolean) => void;
  schools: School[];
  isLoadingSchools: boolean;
  schoolsError: string | null;
  placeholder?: string;
  disabled?: boolean;
}

export function ComboSchoolField({
  identifier,
  isManual,
  onIdentifierChange,
  onIsManualChange,
  schools,
  isLoadingSchools,
  schoolsError,
  placeholder = "Select or type your school...",
  disabled = false,
}: ComboSchoolFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState("");
  const [filteredSchools, setFilteredSchools] = React.useState<School[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoadingSchools || schoolsError) {
      setDisplayValue(""); // Clear display value if loading or error
      return;
    }
    if (!isManual && identifier) {
      const school = schools.find((s) => s.value === identifier);
      setDisplayValue(school ? school.label : identifier); // Fallback to identifier if not found (e.g. stale data)
    } else {
      setDisplayValue(identifier); // For manual entries or empty identifier
    }
  }, [identifier, isManual, schools, isLoadingSchools, schoolsError]);

  // Optimize filtering with debounce
  const filterSchools = React.useCallback(
    (searchValue: string) => {
      if (!searchValue || searchValue.length < 3) {
        setFilteredSchools([]);
        return;
      }

      const filtered = schools.filter((school) =>
        school.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredSchools(filtered.slice(0, 50)); // Limit to first 50 matches
    },
    [schools]
  );

  const handleInputChange = React.useCallback(
    (searchValue: string) => {
      setDisplayValue(searchValue);
      onIdentifierChange(searchValue);
      onIsManualChange(true);
      filterSchools(searchValue);
    },
    [filterSchools, onIdentifierChange, onIsManualChange]
  );

  const handleSelectSchool = (school: School) => {
    onIdentifierChange(school.value);
    onIsManualChange(false);
    setDisplayValue(school.label);
    setOpen(false);
  };

  const triggerLabel = () => {
    if (isLoadingSchools) return "Loading schools...";
    if (schoolsError) return "Error loading schools";
    return displayValue || placeholder;
  };

  const handleSubmit = async (values: any) => {
    // Add debug logging
    console.log('🏫 Submitting School Data:', {
      selectedCollege: values.college,
      schoolsList: schools, // Make sure this is being passed
      hasSchools: schools?.length > 0
    });

    // Make sure schools list is included in the request
    const requestData = {
      ...values,
      schools: schools, // Important: Include full schools list
    };
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-muted-foreground hover:text-muted-foreground"
            disabled={disabled || isLoadingSchools || !!schoolsError}
          >
            <span className="truncate">{triggerLabel()}</span>
            <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              placeholder="Type at least 3 characters to search..."
              value={displayValue}
              onValueChange={handleInputChange}
              disabled={disabled || isLoadingSchools || !!schoolsError}
            />
            <CommandList className="max-h-[300px]">
              {isLoadingSchools && (
                <CommandItem disabled>Loading...</CommandItem>
              )}
              {schoolsError && (
                <CommandItem disabled className="text-red-500">
                  Error: {schoolsError}
                </CommandItem>
              )}
              {!isLoadingSchools &&
                !schoolsError &&
                displayValue.length < 3 && (
                  <CommandEmpty>
                    Type at least 3 characters to search schools...
                  </CommandEmpty>
                )}
              {!isLoadingSchools &&
                !schoolsError &&
                displayValue.length >= 3 &&
                filteredSchools.length === 0 && (
                  <CommandEmpty>
                    No schools found. You can proceed with the name you typed.
                  </CommandEmpty>
                )}
              <CommandGroup>
                {filteredSchools.map((school) => (
                  <CommandItem
                    key={school.value}
                    value={school.label}
                    onSelect={() => handleSelectSchool(school)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        identifier === school.value && !isManual
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {school.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-gray-600 text-center">
        Can't find your school on the list?{" "}
        <Link
          to="/checkout/upload-docs"
          className="text-sunny-orange hover:text-sunny-orange-dark underline"
        >
          Click here to upload documents.
        </Link>
      </p>
    </div>
  );
}

