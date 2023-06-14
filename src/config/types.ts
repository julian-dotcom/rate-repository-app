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

export interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}

export interface NewReview {
  ownerName: string;
  repositoryName: string;
  rating: string;
  text: string;
}

export interface NewUser {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export enum SortType {
  LATEST = "Latest repositories",
  HIGHEST = "Highest rated repositories",
  LOWEST = "Lowest rated repositories",
}
