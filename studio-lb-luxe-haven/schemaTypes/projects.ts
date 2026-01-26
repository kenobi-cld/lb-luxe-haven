import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
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
    }),

    defineField({
      name: 'location',
      type: 'string',
    }),

    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: Rule => Rule.min(1),
    }),

    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'COMPLETED' },
          { title: 'Ongoing', value: 'ONGOING' },
          { title: 'Upcoming', value: 'UPCOMING' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'modal',
      type: 'object',
      fields: [
        { name: 'overview', type: 'text' },
        {
          name: 'scope',
          type: 'array',
          of: [{ type: 'string' }],
        },
        { name: 'outcome', type: 'text' },
      ],
    }),
  ],
})
