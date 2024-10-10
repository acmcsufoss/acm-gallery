import { getGallery } from '../getGallery/gallery';

export async function GET() {
  const gallery = await getGallery();
  return Response.json(gallery);
}