import type { Festival } from '@/constants/festivals';

export const API_BASE_URL =
  'http://festival-alb-1059646586.eu-central-1.elb.amazonaws.com/api';
const listUrl = `${API_BASE_URL}/festivals`;

export async function fetchFestivals(): Promise<Festival[]> {
  console.log('[festivals] fetchFestivals:start', { url: listUrl });
  try {
    const response = await fetch(listUrl);
    console.log('[festivals] fetchFestivals:response', {
      ok: response.ok,
      status: response.status,
    });

    if (!response.ok) {
      throw new Error('Failed to load festivals');
    }

    const data = (await response.json()) as Festival[];
    console.log('[festivals] fetchFestivals:success', { count: data.length });
    return data;
  } catch (error) {
    console.error('[festivals] fetchFestivals:error', error);
    throw error;
  }
}

export async function fetchFestival(id: string): Promise<Festival> {
  console.log('[festivals] fetchFestival:start', { id });
  const festivals = await fetchFestivals();
  const festival = festivals.find((item) => String(item.id) === id);
  if (!festival) {
    console.error('[festivals] fetchFestival:not-found', { id });
    throw new Error('Festival not found');
  }
  console.log('[festivals] fetchFestival:success', {
    id,
    name: festival.name,
  });
  return festival;
}
