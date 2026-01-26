import { defineField, defineType } from 'sanity'

export const featureType = defineType({
  name: 'features',
  title: 'Features - HomePage',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    defineField({
        name: 'description',
        type: 'text',
        validation: Rule => Rule.required(),
    }),
  ],
})
