import { festivals } from '@/constants/festivals';

type Params = {
  id: string;
};

export function GET(_request: Request, { id }: Params) {
  const festival = festivals.find((item) => item.id === id);

  if (!festival) {
    return new Response('Festival not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return Response.json(festival);
}
