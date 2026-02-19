export type LineupArtist = {
  id: number;
  name: string;
  genre: string;
  photoUrl: string;
};

export type Festival = {
  id: number;
  name: string;
  place: string;
  date: string;
  price: number;
  lineup: LineupArtist[];
  photos: string[];
};
