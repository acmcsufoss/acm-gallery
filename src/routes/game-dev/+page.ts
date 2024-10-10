import type { PageLoadEvent } from './$types';
import type { Gallery } from '$lib/public/gallery';

export async function load({ fetch }: PageLoadEvent) {
  const type = 'game_dev'; // Define the type you want to pass 
  const response = await fetch(`/api/files?type=${encodeURIComponent(type)}`); // Add query parameter

  if (!response.ok) {
    throw new Error('Failed to fetch gallery data');
  }

  const gallery = (await response.json()) as Gallery; // Assuming Gallery is your defined type
  console.log(gallery);
  
  return { gallery };
}
