import type { Festival } from '@/constants/festivals';

export const API_BASE_URL =
  'http://festival-alb-1059646586.eu-central-1.elb.amazonaws.com/api';
const listUrl = `${API_BASE_URL}/festivals`;

export async function fetchFestivals(): Promise<Festival[]> {
  const response = await fetch(listUrl);
  if (!response.ok) {
    throw new Error('Failed to load festivals');
  }
  return response.json() as Promise<Festival[]>;
}

export async function fetchFestival(id: string): Promise<Festival> {
  const festivals = await fetchFestivals();
  const festival = festivals.find((item) => String(item.id) === id);
  if (!festival) {
    throw new Error('Festival not found');
  }
  return festival;
}
