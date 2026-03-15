import type { Festival } from "@/constants/festivals";

export const API_BASE_URL =
  "http://festival-alb-1059646586.eu-central-1.elb.amazonaws.com/api/festivals";

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
