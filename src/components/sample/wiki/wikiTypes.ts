export interface GameReview {
  id: string;
  author: string;
  rating: number; // 1 to 10
  recommend: boolean;
  pros: string[];
  cons: string[];
  comment: string;
  date: string;
  likes: number;
}

export interface GameData {
  id: string;
  title: string;
  titleFa: string;
  releaseYear: number;
  developer: string;
  publisher: string;
  engine: string;
  playtime: string;
  platforms: string[];
  genres: string[];
  bannerImage: string;
  coverImage: string;
  shortDescription: string;
  shortDescriptionFa: string;
  fullDescription: string;
  fullDescriptionFa: string;
  scores: {
    ign: number; // out of 10
    gamespot: number; // out of 10
    metacritic: number; // out of 100
    steam: string; // e.g. "96% Overwhelmingly Positive"
    wikiGame: number; // our editorial site score out of 10
  };
  systemReqs: {
    min: { os: string; cpu: string; gpu: string; ram: string; storage: string };
    rec: { os: string; cpu: string; gpu: string; ram: string; storage: string };
  };
  screenshots: string[];
  trailers: { title: string; duration: string; url: string; thumbnail: string }[];
  trainers: {
    title: string;
    version: string;
    author: string;
    features: string[];
    downloadUrl: string;
  };
  persianMod: {
    title: string;
    type: string;
    translator: string;
    features: string[];
    installGuide: string;
    downloadUrl: string;
    size: string;
  };
  walkthrough: {
    chapters: { title: string; summary: string; tips: string[] }[];
  };
  qa: { id: string; question: string; author: string; answer: string; votes: number }[];
  reviews: GameReview[];
}

export interface WikiSharedProps {
  games: GameData[];
  selectedGame: GameData;
  onSelectGame: (gameId: string) => void;
  isFa: boolean;
  isRtl: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenreFilter: string;
  setSelectedGenreFilter: (genre: string) => void;
  selectedPlatformFilter: string;
  setSelectedPlatformFilter: (platform: string) => void;
  filteredGames: GameData[];
  calculatedUserScore: number;
}
