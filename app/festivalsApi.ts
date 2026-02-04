import { festivals } from '@/constants/festivals';

export function GET() {
  return Response.json(festivals);
}
