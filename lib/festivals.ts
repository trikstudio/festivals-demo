import type { Festival } from '@/constants/festivals';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

const listUrl = API_BASE_URL ? `${API_BASE_URL}/festivals` : '/festivals';

export async function fetchFestivals(): Promise<Festival[]> {
  const response = await fetch(listUrl);
  if (!response.ok) {
    throw new Error('Failed to load festivals');
  }
  return response.json() as Promise<Festival[]>;
}

export async function fetchFestival(id: string): Promise<Festival> {
  const url = API_BASE_URL ? `${API_BASE_URL}/festival/${id}` : `/festival/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load festival');
  }
  return response.json() as Promise<Festival>;
}
