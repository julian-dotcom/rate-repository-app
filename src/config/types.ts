export interface CurrentUser {
  username: string;
  id: string;
  reviews: ReviewWithRepoInfo[];
}

export interface NewUser {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface Repository {
  id: string;
  createdAt: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  url: string;
  reviews: Review[];
  ratingAverage?: number;
  reviewCount?: number;
  ownerAvatarUrl: string;
}

interface ReviewBase {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
}

interface ReviewWithUser extends ReviewBase {
  user: {
    id: string;
    username: string;
  };
}

interface ReviewWithRepoInfo extends ReviewBase {
  repository: {
    fullName: string;
    id: string;
  };
}

export type Review = ReviewWithUser | ReviewWithRepoInfo;

export enum ReviewType {
  REVIEW_WITH_USER = "ReviewWithUser",
  REVIEW_WITH_REPO_INFO = "ReviewWithRepoInfo",
}

export interface NewReview {
  ownerName: string;
  repositoryName: string;
  rating: string;
  text: string;
}

export enum SortType {
  LATEST = "Latest repositories",
  HIGHEST = "Highest rated repositories",
  LOWEST = "Lowest rated repositories",
}
