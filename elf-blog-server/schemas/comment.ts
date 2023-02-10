import {defineField, defineType} from 'sanity'

export default {
    name: 'comment',
    type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description
}