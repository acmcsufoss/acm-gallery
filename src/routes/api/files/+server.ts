import { getGallery } from '../getGallery/gallery';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ url }: RequestEvent) {
  const type = url.searchParams.get('type'); // Extract the 'type' query parameter
  if (!type) {
    return new Response(JSON.stringify({ error: 'Type is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const gallery = await getGallery(type); // Fetch the gallery based on the type
  return new Response(JSON.stringify(gallery), {
    headers: { 'Content-Type': 'application/json' },
  });
}

