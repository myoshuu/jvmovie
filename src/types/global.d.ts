export {};

declare global {
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    genre_ids: number[];
    tagline: string;
    budget: number;
    overview: string;
    release_date: string;
  }

  interface Genre {
    id: number;
    name: string;
  }
}
