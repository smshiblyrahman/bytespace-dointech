export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Category = "Design" | "Development" | "IT & Software" | "Business" | "Marketing" | "Photography";

export type Course = {
  id: string;
  title: string;
  /** Byline as printed on course cards, e.g. "purepearl studio". */
  creator: string;
  creatorId: string;
  image: string;
  lessons: number;
  duration: string;
  comments: number;
  level: Level;
  category: Category;
  rating: number;
  price: number;
  enrolled: number;
  /** Popularity signal used by the "Most popular" sort. */
  students: number;
  /** ISO date, used by the "Newest" sort. */
  publishedAt: string;
  topics: string[];
};

export type Creator = {
  id: string;
  name: string;
  role: string;
  /** Short title shown on the course sidebar. */
  headline: string;
  avatar: string;
  profileImage: string;
  bio: string[];
  followers: number;
};

export type Lesson = {
  id: string;
  title: string;
  /** Minutes. */
  duration: number;
  summary: string;
  isPreview?: boolean;
  isLocked?: boolean;
  resources?: { label: string; size: string }[];
};

export type CourseSection = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Review = {
  id: string;
  user: { name: string; avatar: string; role: string };
  rating: number;
  comment: string;
  createdAt: string;
};

export type CourseDetail = {
  headline: string;
  subtitle: string;
  level: Level;
  rating: number;
  reviewCount: number;
  studentCount: number;
  totalLessons: number;
  /** Lessons that are videos (the rest are readings/quizzes). */
  totalVideos: number;
  totalHours: number;
  previewImage: string;
  description: string[];
  sneakPeek: string[];
  keyPoints: string[];
  modulesIntro: string;
  lessonContent: string;
  progressIntro: string;
  progress: number;
  reviewsIntro: string;
  ratingBreakdown: { stars: number; count: number }[];
  sections: CourseSection[];
  reviews: Review[];
};

export type SortOption = "relevant" | "rating" | "popular" | "newest" | "price-asc" | "price-desc";

export type SearchFilters = {
  q: string;
  topic: string;
  level?: Level;
  category?: Category;
  minRating?: number;
  maxPrice?: number;
  sort: SortOption;
  page: number;
};
