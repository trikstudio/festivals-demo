export const API_BASE_URL =
  "http://festival-alb-1059646586.eu-central-1.elb.amazonaws.com/api/festivals";

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
  price: string;
  date: string;
  lineup: LineupArtist[];
  photos: string[];
};

export async function fetchFestivals(): Promise<Festival[]> {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to load festivals");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchFestival(id: string): Promise<Festival> {
  const festivals = await fetchFestivals();
  const festival = festivals.find((item) => String(item.id) === id);
  if (!festival) {
    throw new Error("Festival not found");
  }
  return festival;
}
