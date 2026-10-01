"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { categories, levels } from "@/data/courses";
import { useQueryParams } from "@/hooks/useQueryParams";
import { sortOptions } from "@/lib/search";
import type { SearchFilters } from "@/types";

const ANY = "";

/** Filter / Level / Category pills and the sort menu from the Figma search and creator pages. */
export function CourseToolbar({ filters }: { filters: SearchFilters }) {
  const { update } = useQueryParams();
  const sortLabel = sortOptions.find((o) => o.value === filters.sort)?.label ?? "Most relevant";

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
      <div className="contents sm:flex sm:flex-wrap sm:items-start sm:gap-4">
        <Dropdown
          label="Filter"
          icon="/assets/icons/filter.svg"
          active={Boolean(filters.minRating || filters.maxPrice)}
          groups={[
            {
              title: "Rating",
              selected: filters.minRating ? String(filters.minRating) : ANY,
              options: [
                { value: ANY, label: "Any rating" },
                { value: "4.5", label: "4.5 & up" },
                { value: "4", label: "4.0 & up" },
              ],
              onSelect: (value) => update({ rating: value }),
            },
            {
              title: "Price",
              selected: filters.maxPrice ? String(filters.maxPrice) : ANY,
              options: [
                { value: ANY, label: "Any price" },
                { value: "20", label: "Under $20" },
                { value: "30", label: "Under $30" },
              ],
              onSelect: (value) => update({ price: value }),
            },
          ]}
        />
        <Dropdown
          label={filters.level ?? "Level"}
          icon="/assets/icons/level.svg"
          active={Boolean(filters.level)}
          groups={[
            {
              selected: filters.level ?? ANY,
              options: [{ value: ANY, label: "All levels" }, ...levels.map((l) => ({ value: l, label: l }))],
              onSelect: (value) => update({ level: value }),
            },
          ]}
        />
        <Dropdown
          label={filters.category ?? "Category"}
          icon="/assets/icons/category.svg"
          active={Boolean(filters.category)}
          groups={[
            {
              selected: filters.category ?? ANY,
              options: [
                { value: ANY, label: "All categories" },
                ...categories.map((c) => ({ value: c.label, label: c.label })),
              ],
              onSelect: (value) => update({ category: value }),
            },
          ]}
        />
      </div>

      <Dropdown
        label={sortLabel}
        icon="/assets/icons/sort.svg"
        align="right"
        groups={[
          {
            selected: filters.sort,
            options: sortOptions,
            onSelect: (value) => update({ sort: value === "relevant" ? undefined : value }),
          },
        ]}
      />
    </div>
  );
}
