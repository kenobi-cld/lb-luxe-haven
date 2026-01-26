import { defineConfig } from 'sanity'
import { schemaTypes } from '../schemaTypes'

const projectId = process.env.SANITY_PROJECT_ID

if (!projectId) {
  throw new Error('Missing SANITY_PROJECT_ID environment variable')
}

export default defineConfig({
  name: 'default',
  title: 'My Sanity Studio',

  projectId,
  dataset: 'production',

  schema: {
    types: schemaTypes,
  },
})
