import { Repository, Review, SortType } from "../config/types";

export const parseNumber = (key: string, obj: any) => {
  if (isObj(obj) && key in obj && obj[key] !== undefined && typeof obj[key] === "number") {
    return obj[key];
  } else throw new Error(`Invalid or missing property for key: ${key}`);
};

export const parseString = (key: string, obj: any) => {
  if (isObj(obj) && key in obj && !!obj[key] && typeof obj[key] === "string") {
    return obj[key];
  } else throw new Error(`Invalid or missing property for key: ${key}`);
};

const isObj = (obj: any) => {
  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
    return true;
  } else return false;
};

const parseReviews = (obj: any): Review[] | undefined => {
  const reviews = obj?.reviews?.edges;
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return [];
  const parsed: Review[] = [];
  for (const raw of reviews) {
    if (!raw?.node) continue;
    parsed.push(parseReview(raw.node));
  }
  return parsed;
};

const parseReview = (raw: any): Review => {
  const processedReview: Review = {
    id: parseString("id", raw),
    text: parseString("text", raw),
    rating: parseNumber("rating", raw),
    createdAt: parseString("createdAt", raw),
    user: {
      id: parseString("id", raw?.user),
      username: parseString("username", raw?.user),
    },
  };
  return processedReview;
};

export const parseRepository = (repo: any): Repository => {
  const parsed: Repository = {
    id: parseString("id", repo),
    createdAt: parseString("createdAt", repo),
    fullName: parseString("fullName", repo),
    description: parseString("description", repo),
    language: parseString("language", repo),
    forksCount: parseNumber("forksCount", repo),
    stargazersCount: parseNumber("stargazersCount", repo),
    ownerAvatarUrl: parseString("ownerAvatarUrl", repo),
    url: parseString("url", repo),
    reviews: parseReviews(repo),
    ...(repo.ratingAverage && { ratingAverage: parseNumber("ratingAverage", repo) }),
    ...(repo.reviewCount && { reviewCount: parseNumber("reviewCount", repo) }),
  };

  return parsed;
};

export const sortRepos = (repositories: Repository[], sortType: SortType): Repository[] => {
  console.log(sortType);
  let sorted;
  if (sortType == SortType.HIGHEST) {
    console.log("Highest");
    sorted = repositories.sort((a, b) =>
      a.ratingAverage === undefined && b.ratingAverage === undefined
        ? 0
        : a.ratingAverage === undefined
        ? 1
        : b.ratingAverage === undefined
        ? -1
        : b.ratingAverage - a.ratingAverage
    );
  } else if (sortType === SortType.LOWEST) {
    console.log("Lowest");
    sorted = repositories.sort((a, b) =>
      a.ratingAverage === undefined && b.ratingAverage === undefined
        ? 0
        : a.ratingAverage === undefined
        ? 1
        : b.ratingAverage === undefined
        ? -1
        : a.ratingAverage - b.ratingAverage
    );
  } else {
    console.log("Newest");
    sorted = repositories.sort((a, b) => {
      const dateA = a.createdAt.toUpperCase();
      const dateB = b.createdAt.toUpperCase();
      if (dateA > dateB) return -1;
      else if (dateA < dateB) return 1;
      else return 0;
    });
  }
  return sorted;
};
