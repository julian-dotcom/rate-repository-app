import { Repository, Review, SortType, CurrentUser } from "../config/types";

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

export const parseUser = (raw: any) => {
  const me = raw?.me;
  if (!me || !me?.username || !me?.id) return;
  const processed: CurrentUser = { username: me.username, id: me.id, reviews: [] };
  if (me?.reviews?.edges) {
    processed.reviews = me.reviews.edges.map((r: any) => parseReview(r?.node));
  }
  return processed;
};

const parseReviews = (obj: any): Review[] => {
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
    ...(raw.user && {
      user: {
        id: parseString("id", raw?.user),
        username: parseString("username", raw?.user),
      },
    }),
    ...(raw.repository && {
      repository: {
        fullName: parseString("fullName", raw?.repository),
        id: parseString("id", raw?.repository),
      },
    }),
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
  let sorted;
  if (sortType == SortType.HIGHEST) {
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
    sorted = repositories;
  }
  return sorted;
};
