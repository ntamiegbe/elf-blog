import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'comment',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'approved',
            type: 'boolean',
            title: 'Approved',
            description: 'Comments will not show on the site without approval'
        }),
        defineField({
            name: 'email',
            type: 'string',
        }),
        defineField({
            name: 'comment',
            type: 'text',
        }),
        defineField({
            name: 'post',
            type: 'reference',
            to: [{ type: 'post' }],
        })
    ]
})