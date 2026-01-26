import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'text',
    }),
    defineField({
      name: 'occupation',
      title: 'Occupation',
      type: 'text',
    }),
  ],
})
