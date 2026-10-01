import { courses, levels } from "@/data/courses";
import type { Category, Course, Level, SearchFilters, SortOption } from "@/types";

export const PAGE_SIZE = 18;

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevant", label: "Most relevant" },
  { value: "rating", label: "Highest rated" },
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const categoryValues: Category[] = ["Design", "Development", "IT & Software", "Business", "Marketing", "Photography"];

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

/** Parses untrusted URL params into a typed filter object; anything unknown falls back to defaults. */
export function parseSearchParams(params: RawParams): SearchFilters {
  const level = first(params.level);
  const category = first(params.category);
  const sort = first(params.sort) as SortOption;
  const minRating = Number(first(params.rating));
  const maxPrice = Number(first(params.price));
  const page = Number.parseInt(first(params.page), 10);

  return {
    q: first(params.q).trim().slice(0, 100),
    topic: first(params.topic) || "Featured",
    level: levels.includes(level as Level) ? (level as Level) : undefined,
    category: categoryValues.includes(category as Category) ? (category as Category) : undefined,
    minRating: minRating > 0 && minRating <= 5 ? minRating : undefined,
    maxPrice: maxPrice > 0 ? maxPrice : undefined,
    sort: sortOptions.some((o) => o.value === sort) ? sort : "relevant",
    page: page > 0 ? page : 1,
  };
}

function relevance(course: Course, q: string) {
  if (!q) return 0;
  const title = course.title.toLowerCase();
  if (title.startsWith(q)) return 3;
  if (title.includes(q)) return 2;
  return 1;
}

export function filterCourses(source: Course[], filters: Omit<SearchFilters, "page">) {
  const q = filters.q.toLowerCase();

  const matches = source.filter((course) => {
    // "Featured" is the default tab: the whole catalogue, with featured courses listed first.
    if (filters.topic !== "Featured" && !course.topics.includes(filters.topic)) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.category && course.category !== filters.category) return false;
    if (filters.minRating && course.rating < filters.minRating) return false;
    if (filters.maxPrice && course.price > filters.maxPrice) return false;
    if (q) {
      const haystack = [course.title, course.creator, course.category, ...course.topics].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const sorters: Record<SortOption, (a: Course, b: Course) => number> = {
    relevant: (a, b) => relevance(b, q) - relevance(a, q),
    rating: (a, b) => b.rating - a.rating,
    popular: (a, b) => b.students - a.students,
    newest: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
  };

  // Array.prototype.sort is stable, so "relevant" keeps catalogue order for ties.
  return [...matches].sort(sorters[filters.sort]);
}

/** Builds a URL for `basePath` with the given filters, omitting defaults to keep links clean. */
export function buildFilterHref(basePath: string, filters: SearchFilters, overrides: Partial<SearchFilters> = {}) {
  const f = { ...filters, ...overrides };
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  if (f.topic && f.topic !== "Featured") params.set("topic", f.topic);
  if (f.level) params.set("level", f.level);
  if (f.category) params.set("category", f.category);
  if (f.minRating) params.set("rating", String(f.minRating));
  if (f.maxPrice) params.set("price", String(f.maxPrice));
  if (f.sort !== "relevant") params.set("sort", f.sort);
  if (f.page > 1) params.set("page", String(f.page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function searchCourses(filters: SearchFilters) {
  const results = filterCourses(courses, filters);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  return {
    total: results.length,
    page,
    pageCount,
    items: results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  };
}
