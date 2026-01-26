import { createClient } from '@sanity/client';
export const sanityClient = createClient({
  projectId: 'atxrltcu',
  dataset: 'production',
  apiVersion: '2025-01-28',
  useCdn: true,
});